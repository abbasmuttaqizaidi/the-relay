import { useEffect, useState } from "react";

let isOpenState = false;
const listeners = new Set<(isOpen: boolean) => void>();

export function openBusinessAssociationModal() {
  isOpenState = true;
  listeners.forEach((listener) => listener(true));
}

export function closeBusinessAssociationModal() {
  isOpenState = false;
  listeners.forEach((listener) => listener(false));
}

export function useBusinessAssociationModalState() {
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
    openModal: openBusinessAssociationModal,
    closeModal: closeBusinessAssociationModal,
    setIsOpen: (val: boolean) => {
      if (val) openBusinessAssociationModal();
      else closeBusinessAssociationModal();
    },
  };
}
