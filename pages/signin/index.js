import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../../components/layout';
import Link from 'next/link';

// @material-ui
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link href="/">チャットアプリ</Link> {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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

export default function SignIn() {
  // materialUiのcss？
  const classes = useStyles();
  console.log('classes:', classes);

  const [name, setName] = useState('');
  // ボタン活性化
  const [disabled, setdisabled] = useState(true);
  // 入力テキスト
  const [string, setString] = useState('');

  //入力テキスト取得
  const inputFunc = (e) => {
    setString(e.target.value);
  };

  //ボタン活性化
  useEffect(() => {
    const disabled = string === '' ? true : false;
    setdisabled(disabled);
  }, [string]);

  return (
    <Layout>
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={disabled}>
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
