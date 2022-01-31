import type { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import { Nav } from '@/components/Nav/Nav';
import { RestApiPost } from '@/components/RestApiPost';

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>React講座 postsを表示</title>
      </Head>
      <Nav />
      <RestApiPost />
    </>
  );
};

export default Index;
