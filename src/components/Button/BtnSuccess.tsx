import React, { memo } from 'react';
import Link from 'next/link';

type PROPS = {
  link: boolean;
  href?: string;
  class?: string;
  margin?: string;
  disabled?: boolean;
  children: React.ReactNode;
  click?: React.MouseEventHandler<HTMLButtonElement>;
};

export const BtnSuccess: React.VFC<PROPS> = memo((props) => {
  const {
    margin,
    link,
    href,
    click,
    disabled,
    children,
    class: className,
  } = props;
  const addMarginClass = margin ? ` ${margin}` : '';
  const addBtnClass = className ? ` ${className}` : '';
  if (link) {
    return (
      <div className={`mb-5${addMarginClass}`}>
        <Link href={href}>
          <a
            className={`w-full max-w-full sm:max-w-xs outline-none inline-block bg-green-500 md:hover:bg-green-600 hover:no-underline md:text-base text-sm text-white font-bold py-2 px-4 rounded shadow-md focus:ring-2 focus:ring-black${addBtnClass}`}>
            {children}
          </a>
        </Link>
      </div>
    );
  } else {
    return (
      <div className={`mb-5${addMarginClass}`}>
        <button
          className={`w-full max-w-full sm:max-w-xs outline-none bg-green-500 md:hover:bg-green-600 hover:no-underline md:text-base text-sm text-white font-bold py-2 px-4 rounded shadow-md focus:ring-2 focus:ring-black${addBtnClass}`}
          onClick={click}
          disabled={disabled}>
          {children}
        </button>
      </div>
    );
  }
});
