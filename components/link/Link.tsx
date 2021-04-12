import type { VFC } from 'react';
import Link from 'next/link';

// ?はPartial。stringもしくはundefinedとなる。
type PROPS = {
  href: string;
  class?: string;
  children: React.ReactNode;
};

export const NextLink: VFC<PROPS> = (props) => {
  return (
    <Link href={props.href}>
      <a className={props.class}>{props.children}</a>
    </Link>
  );
};
