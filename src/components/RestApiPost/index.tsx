import type { VFC } from 'react';
import React from 'react';
import Link from 'next/link';
import { NextLink } from '@/components/Link/Link';
import { usePosts } from '@/components/Hooks/usePosts';

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

// const initialState = {
//   posts: [],
//   loading: true,
//   error: null,
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'end':
//       return {
//         ...state,
//         posts: action.posts,
//         loading: false,
//       };
//     case 'error':
//       return {
//         ...state,
//         error: action.error,
//         loading: false,
//       };

//     default:
//       throw new Error('エラー');
//   }
// };
type apiProps = {
  id: string;
  link: string;
  title: {
    rendered: string;
  };
};

export const RestApiPost: VFC = () => {
  const { data, error, isLoading, isEmpty } = usePosts(
    `${process.env.SAKURA_REST_API}`
  );
  // const [state, dispatch] = useReducer(reducer, initialState);

  // const getPosts = useCallback(async () => {
  //   try {
  //     const res = await fetch(`${process.env.SAKURA_REST_API}`);
  //     // https://jsonplaceholder.typicode.com/posts
  //     if (!res.ok) {
  //       throw new Error(res.statusText);
  //     }
  //     const data = await res.json();
  //     dispatch({ type: 'end', posts: data });
  //   } catch (error) {
  //     dispatch({ type: 'error', error: error });
  //   }
  // }, []);

  // useEffect(() => {
  //   getPosts();
  // }, [getPosts]);

  if (isLoading) {
    return (
      <div className="animate-pulse mt-5">
        <div className="h-3 w-3/5 mb-3 bg-gray-400 rounded"></div>
        <div className="h-3 w-3/5 mb-3 bg-gray-400 rounded"></div>
        <div className="h-3 w-3/5 mb-3 bg-gray-400 rounded"></div>
      </div>
    );
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  if (isEmpty) {
    return <div>データはからです...</div>;
  }
  console.log('data:', data);

  return (
    <ul className="my-5">
      {data.map((post: apiProps) => {
        return (
          <li className="mb-4 text-sm" key={post.id}>
            <NextLink
              href={post.link}
              target
              class="text-blue-800 hover:opacity-80">
              {post.title.rendered}
            </NextLink>
            <Link href={`/qin/${post.id}`}>
              <a className="block text-green-700">
                動的ルーティング apiのidは{post.id}
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
