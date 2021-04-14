// react
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// components
import Head from 'next/head';
import Layout from 'src/components/Layout/layout';
import { NextLink } from 'src/components/Link/Link';

// @material-ui
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <NextLink href="/">チャットアプリ</NextLink> {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

//material-uiのstyle
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(): JSX.Element {
  // ルーター
  const router = useRouter();

  // materialUiのcss？
  const classes = useStyles();

  // ユーザーネーム
  const [name, setName] = useState('');

  // ボタン活性化
  const [disabled, setdisabled] = useState(true);

  // 入力テキスト
  const [string, setString] = useState('');

  //ボタン活性化
  useEffect((): void => {
    const disabled = string === '' ? true : false;
    setdisabled(disabled);
  }, [string]);

  //入力テキスト取得
  const inputFunc = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setString(e.target.value);
  };

  //キーダウン取得
  const keydownFunc = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const pressdKey = e.key;
    setName(string);

    if (pressdKey === 'Enter') {
      setName(string);
      e.preventDefault();
    }
  };

  //日本語入力処理
  const compositionFunc = (): void => {
    // console.log('name:', name);
  };

  //ボタンクリックアクション
  const clickFunc = (): void => {
    setName(string);
    router.push({
      pathname: './signin/chat',
      query: { userName: name }, //入力したユーザーネームを渡す
    });
  };

  return (
    <Layout home={false}>
      <Head>
        <title>firebaseでのチャットアプリ</title>
      </Head>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            ようこそ
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="お名前"
              name="name"
              autoFocus
              onChange={inputFunc}
              onKeyDown={keydownFunc}
              onCompositionStart={compositionFunc}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={disabled}
              onClick={clickFunc}>
              はじめる
            </Button>
          </form>
        </div>
        <Box mt={2}>
          <Copyright />
        </Box>
      </Container>
    </Layout>
  );
}
