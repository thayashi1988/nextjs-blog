// react
import React from 'react';
import { useRouter } from 'next/router';

// components
import Head from 'next/head';
import Layout from 'src/components/Layout/layout';
import { Btn } from 'src/components/Button/Btn';
import { ChatList } from 'src/components/List/ChatList';
import { ChatListInput } from 'src/components/List/ChatListInput';

// @material-ui
import { makeStyles } from '@material-ui/core/styles';

//material-uiのstyle
const useStyles = makeStyles({
  root: {
    display: 'grid',
    height: '90vh',
    gridTemplateRows: '1fr auto',
  },
});

export default function Chat(): JSX.Element {
  const router = useRouter();
  const name = router.query.userName;
  if (name === '') {
    router.push('/signin');
  }

  const classes = useStyles();

  return (
    <div>
      <Head>
        <title>firebaseでのチャットアプリ</title>
      </Head>
      <div className={classes.root}>
        <ChatList />
        <ChatListInput
          userName={name}
          avatar="4f83492f4b7fc4c920e857b364eb3bd2"
        />
      </div>
      <div className="text-center">
        <Btn
          link
          href="/signin"
          class="text-sm text-center max-w-sm mx-auto bg-purple-600 hover:bg-purple-800">
          {/* {router.query.userName} */}
          前のページに戻る
        </Btn>
      </div>
    </div>
  );
}