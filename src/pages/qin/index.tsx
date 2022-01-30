import type { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import { Btn } from '@/components/Button/Btn';
import { RestApiPost } from '@/components/RestApiPost';

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>React講座</title>
      </Head>
      <div className="text-center">
        <Btn link={false}>ボタンコンポーネント呼び出し</Btn>
      </div>
      <RestApiPost />
    </>
  );
};

export default Index;
