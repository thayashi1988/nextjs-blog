import type { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import { User } from '@/components/Qin/User';
import { Nav } from '@/components/Nav/Nav';
import { Text } from '@/components/Text/Text';
import { Heading1 } from '@/components/Heading/Heading1';
import { NextLink } from '@/components/Link/Link';
import { List } from '@/components/List/List';
import { ListItem } from '@/components/List/ListItem';

const UserId: NextPage = () => {
  return (
    <>
      <Head>
        <title>
          userAPI連続fetch | userAPI表示 | 動的ルーティング・連続fetch |
          Next.jsアプリ
        </title>
      </Head>
      <Heading1>postAPI連続fetch</Heading1>
      <Text>
        このページで前のページで取得したidとuserIdを元に動的ルーティングを行っております。
        <br />
        例）/qin/users で10番目のリンクを叩くと、/qin/users/10
        と前のページで取得したidをページディレクトリとしてルーティングさせています。
      </Text>
      <Text class="mb-0">
        また、そのidを用いて以下のAPをさらにたたき、idに紐付いたcomments情報を取得し、表示させています。
      </Text>
      <NextLink target href="https://jsonplaceholder.typicode.com/comments">
        {`https://jsonplaceholder.typicode.com/comments/{id}`}
      </NextLink>
      <List>
        <ListItem mark="※">
          APIの構成上、https://jsonplaceholder.typicode.com/usersのidは10件までしかないため、comments情報はid10までしか取得できません。
        </ListItem>
      </List>
      <Nav />
      <User />
    </>
  );
};

export default UserId;
