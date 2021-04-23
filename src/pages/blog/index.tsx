import React from 'react';
import Head from 'next/head';
import { NextLink } from 'src/components/Link/Link';

type BLOGDATA = [
  contents: object[],
  limit: number,
  offset: number,
  totalCount: number
];

type DATA = [
  body: {
    fieldId: string;
    rich: string;
  },
  category: number,
  createdAt: number,
  date: number,
  id: string,
  publishedAt: string,
  revisedAt: string,
  thumb: boolean,
  thumbImg: {
    url: string;
    height: number;
    width: number;
  },
  title: string,
  updatedAt: string
];

export async function getStaticProps() {
  const limit = 50;
  const key = {
    headers: { 'X-API-KEY': `${process.env.MICROCMS_API_KEY}` },
  };
  const data = await fetch(
    `${process.env.MICROCMS_API_URL}/blog?limit=${limit}`,
    key
  );
  const res = await data.json();
  return {
    props: {
      blogData: res,
    },
  };
}

export default function Index({ blogData }): JSX.Element {
  const blogContents = blogData.contents;
  // console.log('blogData:', blogData);
  // console.log('blogContents:', blogContents);

  return (
    <div>
      <Head>
        <title>microCMS読み込み</title>
      </Head>
      <ul>
        {blogContents.map((contents) => (
          <li key={contents.id}>
            <NextLink href={`/blog/${contents.id}`}>{contents.title}</NextLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
