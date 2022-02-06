// import classes from './modal.module.scss';
import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  id: string;
  children: React.ReactNode;
};

export const Modal: React.VFC<Props> = (props) => {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    ref.current = document.querySelector('#__next');
    setMounted(true);
  }, []);
  console.log('mounted:', mounted);

  return mounted
    ? createPortal(
        // <div
        //   id={props.id}
        //   aria-hidden="true"
        //   className={`${classes.wrap}, ${classes['micromodal-slide']}`}>
        //   <div className={classes.overlay} tabIndex={-1} data-micromodal-close>
        //     <div role="dialog" className={classes.dialog} aria-modal="true">
        //       {props.children}
        //     </div>
        //   </div>
        // </div>,
        <div id={props.id} aria-hidden="true" className="wrap micromodal-slide">
          <div className="overlay" tabIndex={-1} data-micromodal-close>
            <div role="dialog" className="dialog" aria-modal="true">
              {props.children}
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
};
