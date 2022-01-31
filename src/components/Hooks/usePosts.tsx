import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

export const usePosts = (apiEndPoint: string) => {
  const { data, error } = useSWR(apiEndPoint, fetcher);
  return {
    data,
    error,
    isLoading: !error && !data,
    isEmpty: data && data.length === 0,
  };
};
