import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Date from '../components/date';
import { Btn } from '../components/button/Btn';
import Layout, { siteTitle } from '../components/layout';
import { getSortedPostsData } from '../lib/posts';
import utilStyles from '../styles/utils.module.css';
import 'tailwindcss/tailwind.css';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

const name = 'じぃのNext.jsアプリ';

export default function Home({ allPostsData, props }) {
  return (
    <Layout home>
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
        <ul className="flex space-x-4">
          <li className="flex-initial">
            <Btn link href="/test/test">
              テストページへ
            </Btn>
          </li>
          <li className="flex-initial">
            <Btn link href="/weather/weather">
              天気予報ページへ
            </Btn>
          </li>
          <li className="flex-initial">
            <Btn link href="/database/database">
              firbaseからの読み込みページへ
            </Btn>
          </li>
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
    </Layout>
  );
}
