import type { VFC } from 'react';
import Link from 'next/link';

type PROPS = {
  link: boolean;
  href?: string;
  class?: string;
  parantClass?: string;
  children: React.ReactNode;
  click?: React.MouseEventHandler<HTMLButtonElement>;
};

export const Btn: VFC<PROPS> = (props) => {
  // console.log('Btnコンポーネントのprops確認:', props);
  if (props.link) {
    return (
      <div className={`mb-5 ${props.parantClass}`}>
        <Link href={props.href}>
          <a
            className={`max-w-xs outline-none inline-block bg-blue-500 hover:bg-blue-600 hover:no-underline md:text-base text-sm text-white font-bold py-2 px-4 rounded shadow-md ${props.class}`}>
            {props.children}
          </a>
        </Link>
      </div>
    );
  } else {
    return (
      <div className={`mb-5 ${props.parantClass}`}>
        <button
          className={`max-w-xs outline-none bg-blue-500 hover:bg-blue-600 hover:no-underline md:text-base text-sm text-white font-bold py-2 px-4 rounded shadow-md ${props.class}`}
          onClick={props.click}>
          {props.children}
        </button>
      </div>
    );
  }
};
