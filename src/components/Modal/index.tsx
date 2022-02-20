import React, { useRef, useState, useEffect, memo } from 'react';
import { createPortal } from 'react-dom';

type PROPS = {
  id: string;
  children: React.ReactNode;
};

export const Modal: React.VFC<PROPS> = memo((props) => {
  // console.log('Modalコンポーネントのレンダリング');

  const { id, children } = props;
  const ref = useRef();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    let unmounted = false;
    ref.current = document.querySelector('#__next');
    setMounted(true);
    return () => {
      unmounted = true;
    };
  }, []);

  return mounted
    ? createPortal(
        <div id={id} aria-hidden="true" className="wrap micromodal-slide">
          <div className="overlay" tabIndex={-1} data-micromodal-close>
            <div role="dialog" className="dialog" aria-modal="true">
              {children}
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
});
