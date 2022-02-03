import Head from 'next/head';
import React from 'react';
import { usePost } from '@/components/Hooks/usePost';
import { Loading } from '@/components/Loading/Loading';
import { TextAlert } from '@/components/Text/TextAlert';
import { Text } from '@/components/Text/Text';
import { Heading2 } from '@/components/Heading/Heading2';

export const Post: React.VFC = () => {
  const { post, user, error, isLoading } = usePost();

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <TextAlert>{error.message}</TextAlert>;
  }

  return (
    <>
      <Head>
        <title>{user?.name}</title>
      </Head>
      <div className="shadow-gray-300/50 rounded overflow-hidden shadow-lg sm:max-w-xl mx-auto p-4 sm:p-8">
        <Heading2 class="text-center">userId：{user?.id}</Heading2>
        <Text class="text-lg">name：{user?.name}</Text>
        <Text class="text-lg">email：{user?.email}</Text>
        <Text class="text-lg">website：{user?.website}</Text>
        {user?.name ? (
          <Text class="text-lg">created by {user.name}</Text>
        ) : null}
      </div>
    </>
  );
};
