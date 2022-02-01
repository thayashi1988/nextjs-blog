import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

const useFetch = (apiEndPoint: string) => {
  const { data, error } = useSWR(apiEndPoint, fetcher);
  return {
    data,
    error,
    isLoading: !error && !data,
    isEmpty: data && data.length === 0,
  };
};

const API_URL = 'https://jsonplaceholder.typicode.com';

export const usePosts = () => {
  return useFetch(`${API_URL}/posts`);
};

export const useUser = () => {
  return useFetch(`${API_URL}/users`);
};

export const useComment = () => {
  return useFetch(`${API_URL}/comments`);
};

export const useCustom = (customUrl: string) => {
  return useFetch(customUrl);
};
