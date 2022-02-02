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
      <div className="mb-3">
        <Link href={props.href}>
          <a
            className={`text-sm text-blue-600 underline inline-block hover:text-blue-400 m-link-icon ${props.class}`}
            target="_blank">
            {props.children}
          </a>
        </Link>
      </div>
    );
  } else {
    return (
      <div className="mb-3">
        <Link href={props.href}>
          <a
            className={`text-sm text-blue-600 underline inline-block hover:text-blue-400 ${props.class}`}>
            {props.children}
          </a>
        </Link>
      </div>
    );
  }
};
