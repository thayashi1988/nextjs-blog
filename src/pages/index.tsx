import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Date from 'src/components/date';
import Layout, { siteTitle } from '@/components/Layout/layout';
import { Btn } from 'src/components/Button/Btn';
import { getSortedPostsData } from 'src/lib/posts';
import utilStyles from 'src/styles/utils.module.css';
import 'tailwindcss/tailwind.css';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

const name: string = 'Next.jsアプリ';

type Links = {
  href: string;
  linkTxt: string;
};

const LINKITEMS: Links[] = [
  {
    href: '/test/test',
    linkTxt: 'テストページへ',
  },
  {
    href: '/weather/weather',
    linkTxt: '天気予報ページへ',
  },
  {
    href: '/database/database',
    linkTxt: 'firebase読み込み',
  },
  {
    href: '/login/login',
    linkTxt: 'Googleログイン',
  },
  {
    href: '/signin',
    linkTxt: 'チャットアプリへ',
  },
  {
    href: '/hunter',
    linkTxt: 'ハンターハンターへ',
  },
];

export default function Home({ allPostsData, props }) {
  return (
    <div>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>{name}</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section>
        <h2 className="text-blue-600 font-bold text-4xl mt-8 mb-5">
          勉強ページ
        </h2>
        <ul className="sm:flex sm:flex-wrap sm:justify-start">
          {LINKITEMS.map((link) => {
            return (
              <li key={link.href} className="sm:flex-initial p-2 sm:w-3/12">
                <Btn link href={link.href} class="w-full text-center">
                  {link.linkTxt}
                </Btn>
              </li>
            );
          })}
        </ul>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className="text-blue-600 font-bold text-4xl mt-8 mb-5">Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a className="text-blue-500">{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
