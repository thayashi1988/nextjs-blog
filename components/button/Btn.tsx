import type { VFC } from 'react';
import Link from 'next/link';

type PROPS = {
  link: boolean;
  href?: string;
  class?: string;
  children: React.ReactNode;
  click?: React.MouseEventHandler<HTMLButtonElement>;
};

export const Btn: VFC<PROPS> = (props) => {
  // console.log('Btnコンポーネントのprops確認:', props);
  if (props.link) {
    return (
      <Link href={props.href}>
        <a
          className={`outline-none inline-block bg-blue-500 hover:bg-blue-700 hover:no-underline text-white font-bold py-2 px-4 rounded shadow-md ${props.class}`}>
          {props.children}
        </a>
      </Link>
    );
  } else {
    return (
      <button
        className={`outline-none bg-red-500 hover:bg-red-700 hover:no-underline text-white font-bold py-2 px-4 rounded shadow-md ${props.class}`}
        onClick={props.click}>
        {props.children}
      </button>
    );
  }
};
