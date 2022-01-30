import type { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import { Btn } from '@/components/Button/Btn';

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>React講座</title>
      </Head>
      <Btn link={false} class="bg-green-500">
        あああああああああああ
      </Btn>
    </>
  );
};

export default Index;
