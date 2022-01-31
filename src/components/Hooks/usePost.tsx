import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

export const usePost = () => {
  const router = useRouter();
  const { data: posts, error: postError } = useSWR(
    router.query.id
      ? `https://jsonplaceholder.typicode.com/posts/${router.query.id}`
      : null,
    fetcher
  );
  const { data: user, error: userError } = useSWR(
    posts?.userId
      ? `https://jsonplaceholder.typicode.com/users/${posts.userId}`
      : null,
    fetcher
  );
  return {
    posts,
    user,
    error: postError || userError,
    isLoading: !user && !userError,
  };
};
