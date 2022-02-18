import React, { useState, useEffect, useCallback, memo } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { BtnSuccess } from '@/components/Button/BtnSuccess';

const Index: NextPage = memo(() => {
  console.log('chat レンダリング');

  const router = useRouter();
  const [disabled, setdisabled] = useState(true);
  const [string, setString] = useState('');

  //ボタン活性化
  useEffect(() => {
    const disabled = function () {
      const disabledBooelan = string === '' ? true : false;
      setdisabled(disabledBooelan);
    };
    console.log('useEffect:');
    return () => disabled();
  }, []);

  //入力テキスト取得
  const inputFunc = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setString(e.target.value);
    e.target.value.length !== 0 ? setdisabled(false) : setdisabled(true);
  };

  //キーダウン取得
  const keydownFunc = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const pressdKey = e.key;

    if (pressdKey === 'Enter') {
      e.preventDefault();
    }
  };

  //日本語入力処理
  const compositionFunc = useCallback((): void => {}, []);

  //ボタンクリックアクション
  const clickFunc = (): void => {
    router.push({
      pathname: '/chat/room',
      query: { userName: string }, //入力したユーザーネームを渡す
    });
  };

  return (
    <div>
      <Head>
        <title>チャットアプリ | Next.jsアプリ</title>
      </Head>
      <div className="flex flex-col items-center w-full sm:max-w-sm sm:mx-auto">
        <Typography component="h1" variant="h5">
          チャットアプリへようこそ
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="お名前を入力してください"
          name="name"
          autoFocus
          onChange={inputFunc}
          onKeyDown={keydownFunc}
          onCompositionStart={compositionFunc}
        />
        <BtnSuccess
          link={false}
          click={clickFunc}
          class="sm:!max-w-full"
          margin="w-full"
          disabled={disabled}>
          はじめる
        </BtnSuccess>
      </div>
    </div>
  );
});

export default Index;
