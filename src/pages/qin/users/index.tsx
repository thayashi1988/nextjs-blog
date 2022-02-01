import type { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import { Nav } from '@/components/Nav/Nav';
import { Users } from '@/components/Users';

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>React講座 usersを表示</title>
      </Head>
      <Nav />
      <Users />
    </>
  );
};

export default Index;
