import React from 'react';
import { NextLink } from '@/components/Link/Link';
import { usePosts, useCustom } from '@/components/Hooks/useFetch';
import { LoadingText } from '@/components/Loading/LoadingText';
import { TextAlert } from '@/components/Text/TextAlert';

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
type APIPOSTPROPS = {
  id: string;
  link: string;
  title: {
    rendered: string;
  };
  name?: string;
};

export const Posts: React.VFC = () => {
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
    return <LoadingText />;
  }
  if (error) {
    return <TextAlert>{error.message}</TextAlert>;
  }
  if (isEmpty) {
    return <div>データはからです...</div>;
  }

  return (
    <ul>
      {data.map((post: APIPOSTPROPS) => {
        return (
          <li className="mb-4" key={post.id}>
            <NextLink href={`/qin/posts/${post.id}`}>
              {post.id}&nbsp;
              {post.title}
            </NextLink>
          </li>
        );
      })}
    </ul>
  );
};
