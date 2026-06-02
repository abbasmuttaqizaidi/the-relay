import { useEffect, useState, useCallback } from "react";

export type InterestStatus = "idle" | "pending" | "accepted" | "declined";

export type InterestRecord = {
  status: InterestStatus;
  pitch: string;
  requestedAt: string;
  respondedAt?: string;
  // Mock contact unlocked only when status === "accepted"
  contact?: { name: string; role: string; email: string };
};

type Store = Record<string, InterestRecord>;

const KEY = "relay.interest.v1";

function read(): Store {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}") as Store;
  } catch {
    return {};
  }
}

function write(store: Store) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(store));
  window.dispatchEvent(new Event("relay:interest"));
}

export function useInterestStore() {
  const [store, setStore] = useState<Store>(() => read());

  useEffect(() => {
    const sync = () => setStore(read());
    window.addEventListener("relay:interest", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("relay:interest", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const request = useCallback((id: string, pitch: string) => {
    const next = {
      ...read(),
      [id]: {
        status: "pending" as InterestStatus,
        pitch,
        requestedAt: new Date().toISOString(),
      },
    };
    write(next);
  }, []);

  const respond = useCallback(
    (
      id: string,
      decision: "accepted" | "declined",
      contact?: InterestRecord["contact"],
    ) => {
      const current = read();
      const existing = current[id];
      if (!existing) return;
      const next: Store = {
        ...current,
        [id]: {
          ...existing,
          status: decision,
          respondedAt: new Date().toISOString(),
          contact: decision === "accepted" ? contact : undefined,
        },
      };
      write(next);
    },
    [],
  );

  const withdraw = useCallback((id: string) => {
    const next = { ...read() };
    delete next[id];
    write(next);
  }, []);

  return { store, request, respond, withdraw };
}

// Reciprocity scoring — recalculated from the interest store.
// Each request sent signals contribution (+5). Each mutual acceptance is
// a completed handoff (+15). Declines are neutral (0).
export const RECIPROCITY_WEIGHTS = {
  request: 5,
  accepted: 15,
} as const;

export type ReciprocityBreakdown = {
  score: number;
  introductionsMade: number;
  mutualAcceptances: number;
  pending: number;
  declined: number;
};

export function computeReciprocity(store: Store): ReciprocityBreakdown {
  const records = Object.values(store);
  const introductionsMade = records.length;
  const mutualAcceptances = records.filter((r) => r.status === "accepted").length;
  const pending = records.filter((r) => r.status === "pending").length;
  const declined = records.filter((r) => r.status === "declined").length;
  const score =
    introductionsMade * RECIPROCITY_WEIGHTS.request +
    mutualAcceptances * RECIPROCITY_WEIGHTS.accepted;
  return { score, introductionsMade, mutualAcceptances, pending, declined };
}

export function useReciprocity(): ReciprocityBreakdown {
  const [store, setStore] = useState<Store>(() => read());
  useEffect(() => {
    const sync = () => setStore(read());
    window.addEventListener("relay:interest", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("relay:interest", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return computeReciprocity(store);
}
