import React from 'react';
import { useUser } from '@/components/Hooks/useUser';
import { Loading } from '@/components/Loading/Loading';
import { TextAlert } from '@/components/Text/TextAlert';
import { Text } from '@/components/Text/Text';
import { Heading2 } from '@/components/Heading/Heading2';
import { ResultCard } from '@/components/Qin/ResultCard/ResultCard';

export const User: React.VFC = () => {
  const { personal, error, isLoading } = useUser();

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <TextAlert>{error.message}</TextAlert>;
  }

  return (
    <>
      <ResultCard>
        <Heading2 class="text-center">id：{personal?.id}</Heading2>
        <Text class="text-lg">postId：{personal?.postId}</Text>
        <Text class="text-lg">email：{personal?.email}</Text>
        <Text class="text-lg">body：{personal?.body}</Text>
      </ResultCard>
    </>
  );
};
