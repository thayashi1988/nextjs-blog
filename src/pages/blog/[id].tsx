import { GetStaticProps, GetStaticPaths } from 'next';
import React from 'react';
import Head from 'next/head';
import { NextImg } from 'src/components/Img/Img';
import { Btn } from 'src/components/Button/Btn';

type MICROCMSDATA = {
  contents: object[];
  limit: number;
  offset: number;
  totalCount: number;
};

type ARTICLEDATA = [{ fieldId: string; rich?: string; html?: string }];

type BLOGDATA = {
  body: ARTICLEDATA;
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

// 静的生成のためのパスを指定します
export async function getStaticPaths() {
  const pageLimit = 50;
  const key = {
    headers: { 'X-API-KEY': `${process.env.MICROCMS_API_KEY}` },
  };
  const data = await fetch(
    `${process.env.MICROCMS_API_URL}/blog?limit=${pageLimit}`,
    key
  );
  const res: MICROCMSDATA = await data.json();

  const paths = res.contents.map((content: BLOGDATA) => `/blog/${content.id}`);
  return { paths, fallback: false };
}

// データをテンプレートに受け渡す部分の処理を記述します
export async function getStaticProps(context: { params: { id: string } }) {
  const id = context.params.id;
  const key = {
    headers: { 'X-API-KEY': `${process.env.MICROCMS_API_KEY}` },
  };
  const data = await fetch(`${process.env.MICROCMS_API_URL}/blog/${id}`, key);
  const res = await data.json();

  return {
    props: {
      blog: res,
    },
  };
}

export default function Index({ blog }): JSX.Element {
  const articleData: BLOGDATA = blog;
  const articlbody = articleData.body;
  // console.log('articlbody:', articlbody);

  return (
    <div>
      <Head>
        <title>{blog.title}</title>
      </Head>
      <p>{blog.publishedAt}</p>
      <h1>{blog.title}</h1>
      <NextImg
        src={blog.thumbImg.url}
        width={blog.thumbImg.width}
        height={blog.thumbImg.height}
      />
      {articlbody.map((body) => {
        if (body.fieldId === 'rich') {
          return (
            <div
              key={body.rich}
              dangerouslySetInnerHTML={{
                __html: `${body.rich}`,
              }}
            />
          );
        } else {
          return (
            <div
              key={body.html}
              dangerouslySetInnerHTML={{
                __html: `${body.html}`,
              }}
            />
          );
        }
      })}
      <div className="text-center">
        <Btn link href="/blog">
          一覧へ戻る
        </Btn>
      </div>
    </div>
  );
}
