import Head from 'next/head';
import React from 'react';
import { usePost } from '@/components/Hooks/usePost';
import { Loading } from '@/components/Loading/Loading';
import { TextAlert } from '@/components/Text/TextAlert';

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
      <h1 className="text-center text-2xl font-bold">id {user?.id}</h1>
      <div className="text-left">
        <h1 className="text-xl font-bold">name {user?.name}</h1>
        <p className="mt-3">email {user?.email}</p>
        <p className="mt-3">website {user?.website}</p>
        {user?.name ? (
          <p className="text-left">created by {user.name}</p>
        ) : null}
      </div>
    </>
  );
};
