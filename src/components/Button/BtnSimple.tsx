import type { VFC } from 'react';
import Link from 'next/link';

type PROPS = {
  link: boolean;
  href?: string;
  class?: string;
  margin?: string;
  children: React.ReactNode;
  click?: React.MouseEventHandler<HTMLButtonElement>;
};

export const BtnSimple: VFC<PROPS> = (props) => {
  const addMarginClass = props.margin ? ` ${props.margin}` : '';
  const addBtnClass = props.class ? ` ${props.class}` : '';
  if (props.link) {
    return (
      <div className={`mb-5${addMarginClass}`}>
        <Link href={props.href}>
          <a className={`max-w-xs outline-none inline-block${addBtnClass}`}>
            {props.children}
          </a>
        </Link>
      </div>
    );
  } else {
    return (
      <div className={`mb-5${addMarginClass}`}>
        <button
          className={`max-w-xs outline-none${addBtnClass}`}
          onClick={props.click}>
          {props.children}
        </button>
      </div>
    );
  }
};
