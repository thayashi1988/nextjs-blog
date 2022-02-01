import type { VFC } from 'react';
import Head from 'next/head';
import React from 'react';
import { useUser } from '@/components/Hooks/useUser';

export const User: VFC = () => {
  const { personal, error, isLoading } = useUser();

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
        <title>{personal?.title}</title>
      </Head>
      <h1 className="text-2xl font-bold text-center mb-6">id {personal?.id}</h1>
      <div className="text-left">
        <h1 className="text-2xl font-bold">{personal?.name}</h1>
        <p className="mt-3">mail address：{personal?.email}</p>
        <p className="mt-3">phone：{personal?.phone}</p>
        <p className="mt-3">company：{personal?.company.name}</p>
      </div>
    </>
  );
};
