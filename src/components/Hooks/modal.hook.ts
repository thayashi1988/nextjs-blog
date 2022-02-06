import client from 'micromodal';
import { useCallback } from 'react';

export const useHook = (id: string) => {
  const open = useCallback(() => {
    client.show(id, {
      onShow: (modal) => console.info(`${modal.id} is shown`),
      onClose: (modal) => console.info(`${modal.id} is hidden`),
      // micromodal options
      // https://micromodal.vercel.app/#configuration
      disableScroll: true,
      awaitOpenAnimation: true,
      awaitCloseAnimation: true,
    });
  }, [id]);

  const close = useCallback(() => {
    client.close(id);
    console.log('client:', client);
  }, [id]);

  return { open, close };
};
