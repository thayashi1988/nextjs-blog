import type { NextPage } from 'next';
import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Btn } from '@/components/Button/Btn';

const PostId: NextPage = () => {
  const router = useRouter();
  console.log('router:', router);
  return (
    <>
      <Head>
        <title>React講座からの動的ページ</title>
      </Head>
      <div className="text-center">
        <p>ページのidは、{router.query.id}</p>
        <Btn link href="/qin" class="block">
          前のページに戻る
        </Btn>
      </div>
    </>
  );
};

export default PostId;
