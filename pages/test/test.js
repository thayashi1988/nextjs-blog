import Head from 'next/head';
import Layout from '../../components/layout';
import { NextLink } from '../../components/link/Link';
import { NextImg } from '../../components/img/Img';
import { Btn } from '../../components/button/Btn';

// clickイベント
function handleClick(e) {
  e.preventDefault();
  alert('クリックイベントのアラート');
  console.log('The link was clicked.');
}

// 繰り返し処理
const listItems = [
  {
    href: '/',
    text: 'TOPへ戻る',
  },
  {
    href: '/',
    text: 'クリックイベント',
  },
];

// 条件処理
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <p className="mt-5">aaaaaaaaaaaaaaa</p>;
  }
  return <p className="mt-5">nnnnnnnnnnnnn</p>;
}
const pageTitle = 'Next.jsのテストページ';

export default function test() {
  return (
    <Layout>
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
            number={1111}
            array={['aaa', 111, 'bbb', 222]}
            obj={{ aaa: 'aaaa', bbb: 'bbb' }}
            bool
            boolean={false}>
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
        {listItems.map(({ href, text }) => (
          <li className="mt-2" key={text}>
            <NextLink href={href} text={text} class="text-blue-500" />
          </li>
        ))}
      </ul>
    </Layout>
  );
}
