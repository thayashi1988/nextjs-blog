import type { VFC } from 'react';
import Link from 'next/link';

type PROPS = {
  link: boolean;
  href?: string;
  class?: string;
  margin?: string;
  children: React.ReactNode;
  click?: React.MouseEventHandler<HTMLButtonElement>;
  clickDiv?: React.MouseEventHandler<HTMLDivElement>;
};

export const BtnLogin: VFC<PROPS> = (props) => {
  const addMarginClass = props.margin ? `${props.margin}` : '';
  const addBtnClass = props.class ? ` ${props.class}` : '';
  if (props.link) {
    return (
      <div className={addMarginClass} onClick={props.clickDiv}>
        <Link href={props.href}>
          <a
            className={`w-full max-w-full sm:max-w-xs outline-none inline-block focus:ring-2 focus:ring-black${addBtnClass}`}>
            {props.children}
          </a>
        </Link>
      </div>
    );
  } else {
    return (
      <div className={addMarginClass} onClick={props.clickDiv}>
        <button
          className={`w-full max-w-full sm:max-w-xs outline-none focus:ring-2 focus:ring-black${addBtnClass}`}
          onClick={props.click}>
          {props.children}
        </button>
      </div>
    );
  }
};
