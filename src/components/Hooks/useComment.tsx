import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

export const useComment = () => {
  const router = useRouter();
  const { data: photo, error: photoError } = useSWR(
    router.query.id
      ? `https://jsonplaceholder.typicode.com/photos?id=${router.query.id}`
      : null,
    fetcher
  );
  return {
    photo,
    error: photoError,
    isLoading: !photo && !photoError,
  };
};
