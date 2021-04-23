import React from 'react';
import Head from 'next/head';
import { NextImg } from 'src/components/Img/Img';
import { Btn } from 'src/components/Button/Btn';

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
  const res = await data.json();

  const paths = res.contents.map((content) => `/blog/${content.id}`);
  return { paths, fallback: false };
}

// データをテンプレートに受け渡す部分の処理を記述します
export async function getStaticProps(context) {
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
  const blogBody = blog.body;

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
      {blogBody.map((body) => {
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
