import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Nav } from '@/components/Nav/Nav';
import { Text } from '@/components/Text/Text';
import { Heading1 } from '@/components/Heading/Heading1';
import { NextLink } from '@/components/Link/Link';
import { List } from '@/components/List/List';
import { ListItem } from '@/components/List/ListItem';
import { Post } from '@/components/Qin/Post';

const PostId: NextPage = () => {
  return (
    <>
      <Head>
        <title>
          postAPI連続fetch | postAPI表示 | 動的ルーティング・連続fetch |
          Next.jsアプリ
        </title>
      </Head>
      <Heading1>postAPI連続fetch</Heading1>
      <Text>
        このページで前のページで取得したidとuserIdを元に動的ルーティングを行っております。
        <br />
        例）/qin/posts で10番目のリンクを叩くと、/qin/posts/10
        と前のページで取得したidをページディレクトリとしてルーティングさせています。
      </Text>
      <Text class="mb-0">
        また、userIdを用いて以下のAPIをさらにたたき、userIdに紐付いたuser情報を取得し表示させています。
      </Text>
      <NextLink target href="https://jsonplaceholder.typicode.com/users">
        {`https://jsonplaceholder.typicode.com/users/{id}`}
      </NextLink>
      <List>
        <ListItem mark="※">
          https://jsonplaceholder.typicode.com/postsのidとuserIdは同じではないので注意してください。
        </ListItem>
      </List>
      <Nav />
      <Post />
    </>
  );
};

export default PostId;
