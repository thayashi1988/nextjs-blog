import React from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Btn } from 'src/components/Button/Btn';
import { ChatList } from 'src/components/List/ChatList';
import { ChatListInput } from 'src/components/List/ChatListInput';

const Index: NextPage = () => {
  const router = useRouter();
  const name = router.query.userName;
  if (name === '') {
    router.push('/chat');
  }

  console.log('room レンダリング', name);

  return (
    <div>
      <Head>
        <title>ルーム | チャットアプリ | Next.jsアプリ</title>
      </Head>
      <div>
        <ChatList />
        <ChatListInput
          userName={name}
          avatar="4f83492f4b7fc4c920e857b364eb3bd2"
        />
      </div>
      <div className="text-center">
        <Btn link href="/chat">
          前のページに戻る
        </Btn>
      </div>
    </div>
  );
};

export default Index;
