import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

export const useUser = () => {
  const router = useRouter();
  const { data: post, error: postError } = useSWR(
    router.query.id
      ? `https://jsonplaceholder.typicode.com/users/${router.query.id}`
      : null,
    fetcher
  );
  const { data: user, error: userError } = useSWR(
    post?.id ? `https://jsonplaceholder.typicode.com/users/${post.id}` : null,
    fetcher
  );
  return {
    post,
    user,
    error: postError || userError,
    isLoading: !user && !userError,
  };
};
