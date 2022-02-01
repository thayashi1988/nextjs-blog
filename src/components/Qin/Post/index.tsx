import type { VFC } from 'react';
import Head from 'next/head';
import React from 'react';
import { usePost } from '@/components/Hooks/usePost';
import { Loading } from '@/components/Loading/Loading';
import { TextAlert } from '@/components/Text/TextAlert';

export const Post: VFC = () => {
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
        <title>{post?.title}</title>
      </Head>
      <h1 className="text-center text-2xl font-bold">id {post?.id}</h1>
      <div className="text-left">
        <h1 className="text-xl font-bold">{post?.title}</h1>
        <p className="mt-3">{post?.body}</p>
        {user?.name ? (
          <p className="text-left">created by {user.name}</p>
        ) : null}
      </div>
    </>
  );
};
