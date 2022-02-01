import type { VFC } from 'react';
import Head from 'next/head';
import React from 'react';
import { useUser } from '@/components/Hooks/useUser';
import { Loading } from '@/components/Loading/Loading';
import { TextAlert } from '@/components/Text/TextAlert';

export const User: VFC = () => {
  const { personal, error, isLoading } = useUser();

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <TextAlert>{error.message}</TextAlert>;
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
