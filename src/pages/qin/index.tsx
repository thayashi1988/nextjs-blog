import type { NextPage } from 'next';
import React, { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import { Btn } from '@/components/Button/Btn';
import { NextLink } from '@/components/Link/Link';

// サーバーサイドレンダリング時に使用する（静的ジェネレーターの場合で使用）
// export async function getStaticProps() {
//   const res = await fetch(
//     'https://pakumogu.sakura.ne.jp/top/wp-json/wp/v2/posts?per_page=3&order=asc'
//   );
//   const data = await res.json();
//   return {
//     props: {
//       data,
//     },
//   };
// }

const Index: NextPage = (props) => {
  const [posts, setPosts] = useState([]);

  const getPosts = useCallback(async () => {
    const res = await fetch(`${process.env.SAKURA_REST_API}`);
    // https://jsonplaceholder.typicode.com/posts
    const data = await res.json();
    setPosts(data);
  }, []);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  console.log('posts:', posts);

  return (
    <>
      <Head>
        <title>React講座</title>
      </Head>
      <div className="text-center">
        <Btn link={false}>ボタンコンポーネント呼び出し</Btn>
      </div>
      {posts.length > 0 ? (
        <ul className="my-5">
          {posts.map((post) => {
            return (
              <li className="mb-3 text-sm" key={post.id}>
                <NextLink
                  href={post.link}
                  class="text-blue-800 hover:opacity-80">
                  {post.title.rendered}
                </NextLink>
              </li>
            );
          })}
        </ul>
      ) : null}
    </>
  );
};

export default Index;
