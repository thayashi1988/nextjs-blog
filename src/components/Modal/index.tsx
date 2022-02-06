import React from 'react';
import { useHook } from '@/components/Hooks/modal.hook';
import { Modal as ModalComponent } from '@/components/Modal/modal.view';
import { useCallback } from 'react';

export type UseMicromodal = (id: string) => {
  Modal: React.VFC<{ children: React.ReactNode; id: string }>;
  open: () => void;
  close: () => void;
};

export const useMicromodal: UseMicromodal = (id: string) => {
  const { open, close } = useHook(id);

  const Modal = useCallback(
    ({ children }) => {
      return <ModalComponent id={id}>{children}</ModalComponent>;
    },
    [id]
  );

  return {
    Modal,
    open,
    close,
  };
};
