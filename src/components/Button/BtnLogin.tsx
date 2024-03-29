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
  clickDiv?: React.MouseEventHandler<HTMLDivElement>;
};

export const BtnLogin: React.VFC<PROPS> = memo((props) => {
  const {
    margin,
    link,
    href,
    click,
    clickDiv,
    disabled,
    children,
    class: className,
  } = props;
  const addMarginClass = margin ? `${margin}` : '';
  const addBtnClass = className ? ` ${className}` : '';
  if (link) {
    return (
      <div className={addMarginClass} onClick={clickDiv}>
        <Link href={href}>
          <a
            className={`w-full max-w-full sm:max-w-xs outline-none inline-block focus-visible:ring-2 focus-visible:ring-black${addBtnClass}`}>
            {children}
          </a>
        </Link>
      </div>
    );
  } else {
    return (
      <div className={addMarginClass} onClick={clickDiv}>
        <button
          className={`w-full max-w-full sm:max-w-xs outline-none focus-visible:ring-2 focus-visible:ring-black${addBtnClass}`}
          onClick={click}
          disabled={disabled}>
          {children}
        </button>
      </div>
    );
  }
});
