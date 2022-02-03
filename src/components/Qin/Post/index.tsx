import React from 'react';
import { usePost } from '@/components/Hooks/usePost';
import { Loading } from '@/components/Loading/Loading';
import { TextAlert } from '@/components/Text/TextAlert';
import { Text } from '@/components/Text/Text';
import { Heading2 } from '@/components/Heading/Heading2';
import { ResultCard } from '@/components/Qin/ResultCard/ResultCard';

export const Post: React.VFC = () => {
  const { post, user, error, isLoading } = usePost();

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <TextAlert>{error.message}</TextAlert>;
  }

  return (
    <ResultCard>
      <Heading2 class="text-center">userId：{user?.id}</Heading2>
      <Text class="text-lg">name：{user?.name}</Text>
      <Text class="text-lg">email：{user?.email}</Text>
      <Text class="text-lg">website：{user?.website}</Text>
      {user?.name ? <Text class="text-lg">created by {user.name}</Text> : null}
    </ResultCard>
  );
};
