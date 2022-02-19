import React, { useContext, memo } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Heading1 } from '@/components/Heading/Heading1';
import { Heading2 } from '@/components/Heading/Heading2';
import { Text } from '@/components/Text/Text';
import { Btn } from '@/components/Button/Btn';
import { Child1 } from '@/components/Memo/Child1';
import { Child4 } from '@/components/Memo/Child4';
import { Card } from '@/components/Memo/Card';
import { AdminFlagContext } from '@/components/Providers/AdminFlagProvoder';
import { useCountup } from '@/components/Hooks/useCountup';

const Index: NextPage = memo(() => {
  const { count, handleCountUp, handleCountReset } = useCountup(); //カスタムhook
  const { isAdmin, SetIsAdmin } = useContext(AdminFlagContext);
  console.log('indexページ レンダリング:', count);

  const handleAdinSwitch = () => {
    SetIsAdmin(!isAdmin);
  };

  return (
    <>
      <Head>
        <title>useContext・useCallback・memo | Next.jsアプリ</title>
      </Head>
      <Heading1>useContext、useMemo、useCallback、カスタムフック</Heading1>
      <Heading2>useContext</Heading2>
      {isAdmin ? <span>管理者です。</span> : <span>一般ユーザです。</span>}
      <Card isAdmin={isAdmin} />
      <Btn link={false} click={handleAdinSwitch}>
        管理者切り替え
      </Btn>
      <Heading2>useMemo、useCallback、カスタムフック</Heading2>
      <Btn link={false} click={handleCountUp}>
        カウントアップ
      </Btn>
      <Text>{count}</Text>
      <Child1 clickEvent={handleCountReset} />
      <Child4 />
    </>
  );
});

export default Index;
