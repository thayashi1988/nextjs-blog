export const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('エラー発生しました。');
  }
  const json = await response.json();
  return json;
};
