import { useEffect, useState } from "react";

let isOpenState = false;
const listeners = new Set<(isOpen: boolean) => void>();

export function openSwitchProfileModal() {
  isOpenState = true;
  listeners.forEach((listener) => listener(true));
}

export function closeSwitchProfileModal() {
  isOpenState = false;
  listeners.forEach((listener) => listener(false));
}

export function useSwitchProfileModalState() {
  const [isOpen, setIsOpen] = useState(isOpenState);

  useEffect(() => {
    const handler = (state: boolean) => setIsOpen(state);
    listeners.add(handler);
    return () => {
      listeners.delete(handler);
    };
  }, []);

  return {
    isOpen,
    openModal: openSwitchProfileModal,
    closeModal: closeSwitchProfileModal,
    setIsOpen: (val: boolean) => {
      if (val) openSwitchProfileModal();
      else closeSwitchProfileModal();
    },
  };
}
