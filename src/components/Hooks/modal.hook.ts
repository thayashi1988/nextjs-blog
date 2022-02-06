import client from 'micromodal';
import { useCallback } from 'react';

export const useHook = (id: string) => {
  const open = useCallback(() => {
    client.show(id, {
      // micromodal options
      // https://micromodal.vercel.app/#configuration
      // onShow: (modal) => console.info(`${modal.id} is shown`),
      // onClose: (modal) => console.info(`${modal.id} is hidden`),
      disableScroll: true,
      awaitOpenAnimation: true,
      awaitCloseAnimation: true,
    });
  }, [id]);

  const close = useCallback(() => {
    client.close(id);
  }, [id]);

  return { open, close };
};
