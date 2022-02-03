import type { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import { Comment } from '@/components/Qin/Comment';
import { Nav } from '@/components/Nav/Nav';
import { Text } from '@/components/Text/Text';
import { Heading1 } from '@/components/Heading/Heading1';
import { NextLink } from '@/components/Link/Link';

const commentsId: NextPage = () => {
  return (
    <>
      <Head>
        <title>
          commentAPI連続fetch | commentAPI表示 | 動的ルーティング・連続fetch |
          Next.jsアプリ
        </title>
      </Head>
      <Heading1>commentAPI連続fetch</Heading1>
      <Text>
        このページで前のページで取得したidとuserIdを元に動的ルーティングを行っております。
        <br />
        例）/qin/users で10番目のリンクを叩くと、/qin/users/10
        と前のページで取得したidをページディレクトリとしてルーティングさせています。
      </Text>
      <Text class="mb-0">
        また、そのidを用いて以下のAPをさらにたたき、idに紐付いたphotos情報を取得し、表示させています。
      </Text>
      <NextLink target href="https://jsonplaceholder.typicode.com/photos">
        {`https://jsonplaceholder.typicode.com/photos?id={id}`}
      </NextLink>
      <Nav />
      <Comment />
    </>
  );
};

export default commentsId;
