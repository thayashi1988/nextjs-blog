import type { VFC } from 'react';
import React from 'react';
import { NextLink } from '@/components/Link/Link';
import { usePosts, useCustom } from '@/components/Hooks/useFetch';
import { Loading } from '@/components/Loading/Loading';

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
type apiPostsProps = {
  id: string;
  link: string;
  title: {
    rendered: string;
  };
  name?: string;
};

export const Posts: VFC = () => {
  const { data, error, isLoading, isEmpty } = usePosts();
  const {
    data: sakura,
    error: sakuraError,
    isLoading: sarakuIsLoading,
    isEmpty: sakuraIsEmpty,
  } = useCustom(`${process.env.SAKURA_REST_API}`);
  console.log('sakura:', sakura);

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
    return <Loading />;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  if (isEmpty) {
    return <div>データはからです...</div>;
  }

  return (
    <ul className="my-5">
      {data.map((post: apiPostsProps) => {
        return (
          <li className="mb-4 text-sm" key={post.id}>
            {/* <NextLink
              href={post.link}
              target
              class="text-blue-800 hover:opacity-80">
              {post.title.rendered}
            </NextLink> */}
            <NextLink
              href={`/qin/posts/${post.id}`}
              class="text-black-600 hover:opacity-80">
              {post.id}&nbsp;
              {post.title}
            </NextLink>
            {/* <Link href={`/qin/${post.id}`}>
              <a className="block text-green-700">
                動的ルーティング apiのidは{post.id}
              </a>
            </Link> */}
          </li>
        );
      })}
    </ul>
  );
};
