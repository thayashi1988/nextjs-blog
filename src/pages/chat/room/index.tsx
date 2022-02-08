import React from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Btn } from 'src/components/Button/Btn';
import { ChatList } from 'src/components/List/ChatList';
import { ChatListInput } from 'src/components/List/ChatListInput';
import { makeStyles } from '@material-ui/core/styles';

//material-uiのstyle
const useStyles = makeStyles({
  root: {
    display: 'grid',
    height: '90vh',
    gridTemplateRows: '1fr auto',
  },
});

const Index: NextPage = () => {
  const router = useRouter();
  const name = router.query.userName;
  if (name === '') {
    router.push('/signin');
  }

  const classes = useStyles();

  return (
    <div>
      <Head>
        <title>ルーム | チャットアプリ | Next.jsアプリ</title>
      </Head>
      <div className={classes.root}>
        <ChatList />
        <ChatListInput
          userName={name}
          avatar="4f83492f4b7fc4c920e857b364eb3bd2"
        />
      </div>
      <div className="text-center">
        <Btn link href="/signin">
          前のページに戻る
        </Btn>
      </div>
    </div>
  );
};

export default Index;
