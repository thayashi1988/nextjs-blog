import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Nav } from '@/components/Nav/Nav';
import { Text } from '@/components/Text/Text';
import { Heading1 } from '@/components/Heading/Heading1';
import { NextLink } from '@/components/Link/Link';

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>動的ルーティング・連続fetch | Next.jsアプリ</title>
      </Head>
      <Heading1>動的ルーティング・連続fetch</Heading1>
      <Text class="mb-0">
        以下のJSONAPIを叩いてデータを取得し表示、その後取得したidから動的ルーティングを行い、さらにAPIを叩いてデータ取得をするページとなっております。
      </Text>
      <NextLink target href="https://jsonplaceholder.typicode.com/">
        https://jsonplaceholder.typicode.com/
      </NextLink>
      <Nav />
    </>
  );
};

export default Index;
