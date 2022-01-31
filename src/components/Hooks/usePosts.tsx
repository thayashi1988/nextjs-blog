import useSWR from 'swr';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('エラー発生しました。');
  }
  const json = await response.json();
  return json;
};

export const usePosts = (apiEndPoint: string) => {
  const { data, error } = useSWR(apiEndPoint, fetcher);
  return {
    data,
    error,
    isLoading: !error && !data,
    isEmpty: data && data.length === 0,
  };
};
