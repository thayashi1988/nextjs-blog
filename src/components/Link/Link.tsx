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
  const { margin, href, class: className, target, children } = props;
  const addMarginClass = margin ? ` ${margin}` : '';
  const addLinkClass = className ? ` ${className}` : '';

  if (target) {
    return (
      <span className={`inline-block mb-3${addMarginClass}`}>
        <Link href={href}>
          <a
            className={`text-sm text-blue-600 underline inline-block md:hover:text-blue-400 m-link-icon${addLinkClass}`}
            target="_blank">
            {children}
          </a>
        </Link>
      </span>
    );
  } else {
    return (
      <span className={`inline-block mb-3${addMarginClass}`}>
        <Link href={href}>
          <a
            className={`text-sm text-blue-600 underline inline-block md:hover:text-blue-400${addLinkClass}`}>
            {children}
          </a>
        </Link>
      </span>
    );
  }
};
