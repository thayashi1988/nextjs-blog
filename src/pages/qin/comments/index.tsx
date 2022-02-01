import type { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import { Nav } from '@/components/Nav/Nav';
import { Comments } from '@/components/Qin/Comments';

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>React講座 commentsを表示</title>
      </Head>
      <Nav />
      <Comments />
    </>
  );
};

export default Index;
