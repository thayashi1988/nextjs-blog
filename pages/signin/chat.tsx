// react
import React from 'react';
import { useRouter } from 'next/router';

// components
import Head from 'next/head';
import Layout from '../../components/layout';
import { NextLink } from '../../components/link/Link';
import { ChatList } from '../../components/list/ChatList';
import { ChatListInput } from '../../components/list/ChatListInput';

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

  const classes = useStyles();

  return (
    <Layout home={false}>
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
      <NextLink href="/signin" class="text-sm text-blue-500 underline">
        {/* {router.query.userName} */}
        前のページに戻る
      </NextLink>
    </Layout>
  );
}
