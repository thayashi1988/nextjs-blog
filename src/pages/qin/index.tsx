import type { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import { Nav } from '@/components/Nav/Nav';

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>React講座</title>
      </Head>
      <Nav />
    </>
  );
};

export default Index;
