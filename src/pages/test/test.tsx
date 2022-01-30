import { NextPage } from 'next';
import React, { useState } from 'react';
import Head from 'next/head';
import { NextLink } from 'src/components/Link/Link';
import { NextImg } from 'src/components/Img/Img';
import { Btn } from 'src/components/Button/Btn';

// 型定義
type ListItems = {
  href: string;
  text: string;
};

// 繰り返し処理
const LISTITEMS: ListItems[] = [
  {
    href: '/',
    text: 'TOPへ戻る',
  },
  {
    href: '/',
    text: 'クリックイベント',
  },
];

// clickイベント
const handleClick = (e: React.MouseEvent): void => {
  e.preventDefault();
  alert('クリックイベントのアラート');
};

// 条件処理
const Greeting = (props: { isLoggedIn: Boolean }) => {
  const isLoggedIn: Boolean = props.isLoggedIn;
  if (isLoggedIn) {
    return <p className="mt-5">aaaaaaaaaaaaaaa</p>;
  }
  return <p className="mt-5">nnnnnnnnnnnnn</p>;
};
const pageTitle: string = 'Next.jsのテストページ';

const Test: NextPage = () => {
  // const [homeFlag, setHomeFlag] = useState(false);
  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <NextImg
        class="text-center"
        src="/images/profile.jpg"
        width="400"
        height="400"
        quality="70"
      />

      <ul className="sm:flex text-center block items-center justify-evenly mt-5">
        <li className="mb-2 sm:mb-0">
          <Btn
            link
            href="/"
            class="w-full"
            // number={1111}
            // array={['aaa', 111, 'bbb', 222]}
            // obj={{ aaa: 'aaaa', bbb: 'bbb' }}
            // bool
            // boolean={false}
          >
            TOPへ遷移するボタン
          </Btn>
        </li>
        <li className="mb-2 sm:mb-0">
          <Btn link={false} class="w-full" click={handleClick}>
            イベント発生するボタン
          </Btn>
        </li>
      </ul>

      <Greeting isLoggedIn={true} />

      <ul className="mt-5">
        {LISTITEMS.map(({ href, text }) => (
          <li className="mt-2" key={text}>
            <NextLink href={href} class="text-blue-500">
              {text}
            </NextLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Test;
