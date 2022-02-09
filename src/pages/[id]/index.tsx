import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Btn } from 'src/components/Button/Btn';
import { Heading1 } from '@/components/Heading/Heading1';
import { Column } from '@/components/Column/Column';
import { ColumnItem } from '@/components/Column/ColumnItem';
import { auth } from '../../../firebase';

type LINKS = {
  href: string;
  linkTxt: string;
}[];

const LINKITEMS: LINKS = [
  {
    href: '/tutorial',
    linkTxt: 'next.js チュートリアル',
  },
  {
    href: '/material',
    linkTxt: 'materialUIサンプル',
  },
  {
    href: '/weather',
    linkTxt: '天気予報ページ',
  },
  {
    href: '/firestore',
    linkTxt: 'Cloud Firestore読み込み',
  },
  {
    href: '/chat',
    linkTxt: 'チャットアプリ',
  },
  {
    href: '/hunter',
    linkTxt: '大工ハンターハンター',
  },

  {
    href: '/blog',
    linkTxt: 'microCMS SSG',
  },
  {
    href: '/qin',
    linkTxt: '動的ルーティング、連続fetch',
  },
  {
    href: '/components',
    linkTxt: 'コンポーネントページ',
  },
  {
    href: '/storage',
    linkTxt: 'ファイルアップ',
  },
];

const Index: NextPage = () => {
  const [loginName, setLoginName] = useState(null);
  useEffect(() => {
    const authProcess = auth.onAuthStateChanged((firebaseDatas) => {
      const authName = firebaseDatas.displayName;
      setLoginName(authName);
    });
    return () => authProcess();
  }, [loginName]);

  return (
    <>
      <Head>
        <title>ホーム | Next.jsアプリ</title>
      </Head>
      <section>
        <Heading1>
          ようこそ！
          <span className="md:font-lg font-lg">{loginName}さん</span>
        </Heading1>
        <Column>
          {LINKITEMS.map((item) => {
            return (
              <ColumnItem key={item.href} class="sm:w-6/12 md:w-4/12">
                <Btn
                  link
                  href={item.href}
                  class="w-full text-center"
                  margin="mb-2">
                  {item.linkTxt}
                </Btn>
              </ColumnItem>
            );
          })}
        </Column>
      </section>
    </>
  );
};

export default Index;
