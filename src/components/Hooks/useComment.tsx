import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

export const useComment = () => {
  const router = useRouter();
  const { data: comment, error: commentError } = useSWR(
    router.query.id
      ? `https://jsonplaceholder.typicode.com/comments/?postId=${router.query.id}`
      : null,
    fetcher
  );
  return {
    comment,
    error: commentError,
    isLoading: !comment && !commentError,
  };
};
