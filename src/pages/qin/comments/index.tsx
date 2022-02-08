import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Nav } from '@/components/Nav/Nav';
import { Text } from '@/components/Text/Text';
import { Heading1 } from '@/components/Heading/Heading1';
import { NextLink } from '@/components/Link/Link';
import { Comments } from '@/components/Qin/Comments';

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>
          commentsAPI表示 | 動的ルーティング・連続fetch | Next.jsアプリ
        </title>
      </Head>
      <Heading1>commentsAPI表示</Heading1>
      <Text class="mb-0">
        このページでは以下のAPIを叩きデータを取得し、id、nameを表示させています。
      </Text>
      <NextLink target href="https://jsonplaceholder.typicode.com/comments">
        https://jsonplaceholder.typicode.com/comments
      </NextLink>
      <Nav />
      <Comments />
    </>
  );
};

export default Index;
