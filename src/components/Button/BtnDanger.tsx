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

export const BtnDanger: VFC<PROPS> = (props) => {
  const addMarginClass = props.margin ? ` ${props.margin}` : '';
  const addBtnClass = props.class ? ` ${props.class}` : '';
  if (props.link) {
    return (
      <div className={`mb-5${addMarginClass}`}>
        <Link href={props.href}>
          <a
            className={`w-full max-w-full sm:max-w-xs outline-none inline-block bg-red-500 md:hover:bg-red-600 hover:no-underline md:text-base text-sm text-white font-bold py-2 px-4 rounded shadow-md focus:ring-2 focus:ring-black${addBtnClass}`}>
            {props.children}
          </a>
        </Link>
      </div>
    );
  } else {
    return (
      <div className={`mb-5${addMarginClass}`}>
        <button
          className={`w-full max-w-full sm:max-w-xs outline-none bg-red-500 md:hover:bg-red-600 hover:no-underline md:text-base text-sm text-white font-bold py-2 px-4 rounded shadow-md focus:ring-2 focus:ring-black${addBtnClass}`}
          onClick={props.click}>
          {props.children}
        </button>
      </div>
    );
  }
};
