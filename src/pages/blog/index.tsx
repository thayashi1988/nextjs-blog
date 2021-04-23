import React from 'react';
import Head from 'next/head';
import { NextImg } from 'src/components/Img/Img';
import { NextLink } from 'src/components/Link/Link';

type BLOGDATA = {
  contents: object[];
  limit: number;
  offset: number;
  totalCount: number;
};

type DATA = {
  body: {
    fieldId: string;
    rich: string;
  };
  category: number;
  createdAt: number;
  date: number;
  id: string;
  publishedAt: string;
  revisedAt: string;
  thumb: boolean;
  thumbImg: {
    url: string;
    height: number;
    width: number;
  };
  title: string;
  updatedAt: string;
};

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
  const blogDatas: BLOGDATA = blogData;
  const blogContents = blogDatas.contents;
  console.log('blogContents:', blogContents);

  return (
    <div>
      <Head>
        <title>microCMS読み込み</title>
      </Head>
      <ul className="sm:flex sm:flex-wrap sm:justify-start">
        {blogContents.map((contents: DATA) => (
          <li className="sm:flex-initial p-2 sm:w-4/12" key={contents.id}>
            <NextLink
              class="block w-full h-full rounded p-2 shadow-lg text-sm"
              href={`/blog/${contents.id}`}>
              <NextImg
                class="mb-2"
                src={contents.thumbImg.url}
                width={contents.thumbImg.width}
                height={contents.thumbImg.height}
              />
              {contents.title}
            </NextLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
