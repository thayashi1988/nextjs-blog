import type { VFC } from 'react';
import Head from 'next/head';
import React from 'react';
import { usePost } from '@/components/Hooks/usePost';

export const Post: VFC = () => {
  const { posts, user, error, isLoading } = usePost();

  if (isLoading) {
    return (
      <div className="animate-pulse mt-5">
        <div className="h-3 w-3/5 mb-3 bg-gray-400 rounded"></div>
        <div className="h-3 w-3/5 mb-3 bg-gray-400 rounded"></div>
        <div className="h-3 w-3/5 mb-3 bg-gray-400 rounded"></div>
      </div>
    );
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  console.log({ posts, user });

  return (
    <>
      <Head>
        <title>{posts?.title}</title>
      </Head>
      <div className="text-center">
        <h1 className="text-2xl font-bold">{posts?.title}</h1>
        <p className="mt-3">{posts?.body}</p>
        {user?.name ? (
          <p className="text-left">created by {user.name}</p>
        ) : null}
      </div>
    </>
  );
};
