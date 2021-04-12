import Head from 'next/head';
import Layout from '../../components/layout';
import { NextLink } from '../../components/link/Link';
import { NextImg } from '../../components/img/Img';
import { Btn } from '../../components/button/Btn';

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
function handleClick(e: any): void {
  e.preventDefault();
  alert('クリックイベントのアラート');
}

// 条件処理
function Greeting(props) {
  const isLoggedIn: Boolean = props.isLoggedIn;
  if (isLoggedIn) {
    return <p className="mt-5">aaaaaaaaaaaaaaa</p>;
  }
  return <p className="mt-5">nnnnnnnnnnnnn</p>;
}
const pageTitle: string = 'Next.jsのテストページ';

export default function test(): JSX.Element {
  return (
    <Layout home={false}>
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
    </Layout>
  );
}
