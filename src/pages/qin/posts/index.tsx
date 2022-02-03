import type { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import { Nav } from '@/components/Nav/Nav';
import { Text } from '@/components/Text/Text';
import { Heading1 } from '@/components/Heading/Heading1';
import { NextLink } from '@/components/Link/Link';
import { Posts } from '@/components/Qin/Posts';

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>postAPI表示 | 動的ルーティング・連続fetch | Next.jsアプリ</title>
      </Head>
      <Heading1>postAPI表示</Heading1>
      <Text>
        このページでは以下のAPIを叩きデータを取得し、id、bodyを表示させています。
        <br />
        <NextLink target href="https://jsonplaceholder.typicode.com/posts">
          https://jsonplaceholder.typicode.com/posts
        </NextLink>
      </Text>
      <Nav />
      <Posts />
    </>
  );
};

export default Index;
