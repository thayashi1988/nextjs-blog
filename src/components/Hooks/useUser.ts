import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

export const useUser = () => {
  const router = useRouter();
  const { data: user, error: userError } = useSWR(
    router.query.id
      ? `https://jsonplaceholder.typicode.com/users/${router.query.id}`
      : null,
    fetcher
  );
  const { data: personal, error: personalError } = useSWR(
    user?.id
      ? `https://jsonplaceholder.typicode.com/comments/${user.id}`
      : null,
    fetcher
  );
  return {
    user,
    personal,
    error: userError || personalError,
    isLoading: !personal && !personalError,
  };
};
