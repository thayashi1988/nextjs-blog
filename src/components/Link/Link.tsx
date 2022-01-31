import type { VFC } from 'react';
import Link from 'next/link';

// ?はPartial。stringもしくはundefinedとなる。
type PROPS = {
  href: string;
  class?: string;
  target?: Boolean;
  children: React.ReactNode;
};

export const NextLink: VFC<PROPS> = (props) => {
  if (props.target) {
    return (
      <Link href={props.href}>
        <a className={props.class} target="_blank">
          {props.children}
        </a>
      </Link>
    );
  } else {
    return (
      <Link href={props.href}>
        <a className={props.class}>{props.children}</a>
      </Link>
    );
  }
};
