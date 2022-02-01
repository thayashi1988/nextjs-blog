import type { VFC } from 'react';
import Head from 'next/head';
import React from 'react';
import { useUser } from '@/components/Hooks/useUser';

export const User: VFC = () => {
  const { post, user, error, isLoading } = useUser();

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

  return (
    <>
      <Head>
        <title>{post?.title}</title>
      </Head>
      <div className="text-center">
        <h1 className="text-2xl font-bold">{post?.name}</h1>
        <p className="mt-3">mail address：{post?.email}</p>
        <p className="mt-3">phone：{post?.phone}</p>
        <p className="mt-3">company：{post?.company.name}</p>
      </div>
    </>
  );
};
