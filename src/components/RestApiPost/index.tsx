import type { VFC } from 'react';
import React, { useState, useCallback, useEffect } from 'react';
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

export const RestApiPost: VFC = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPosts = useCallback(async () => {
    try {
      const res = await fetch(`${process.env.SAKURA_REST_API}`);
      // https://jsonplaceholder.typicode.com/posts
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  if (loading) {
    return (
      <div className="animate-pulse mt-5">
        <div className="h-3 w-3/5 mb-3 bg-gray-400 rounded"></div>
        <div className="h-3 w-3/5 mb-3 bg-gray-400 rounded"></div>
        <div className="h-3 w-3/5 mb-3 bg-gray-400 rounded"></div>
      </div>
    );
  }
  if (error) {
    return <div>error...</div>;
  }
  if (posts.length === 0) {
    return <div>データはからです...</div>;
  }
  console.log('posts:', posts);

  return (
    <ul className="my-5">
      {posts.map((post) => {
        return (
          <li className="mb-3 text-sm" key={post.id}>
            <NextLink href={post.link} class="text-blue-800 hover:opacity-80">
              {post.title.rendered}
            </NextLink>
          </li>
        );
      })}
    </ul>
  );
};
