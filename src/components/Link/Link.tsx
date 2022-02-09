import React from 'react';
import Link from 'next/link';

type PROPS = {
  margin?: string;
  href: string;
  class?: string;
  target?: Boolean;
  children: React.ReactNode;
};

export const NextLink: React.VFC<PROPS> = (props) => {
  const addMarginClass = props.margin ? ` ${props.margin}` : '';
  const addLinkClass = props.class ? ` ${props.class}` : '';

  if (props.target) {
    return (
      <div className={`mb-3${addMarginClass}`}>
        <Link href={props.href}>
          <a
            className={`text-sm text-blue-600 underline inline-block md:hover:text-blue-400 m-link-icon${addLinkClass}`}
            target="_blank">
            {props.children}
          </a>
        </Link>
      </div>
    );
  } else {
    return (
      <div className={`mb-3${addMarginClass}`}>
        <Link href={props.href}>
          <a
            className={`text-sm text-blue-600 underline inline-block md:hover:text-blue-400${addLinkClass}`}>
            {props.children}
          </a>
        </Link>
      </div>
    );
  }
};
