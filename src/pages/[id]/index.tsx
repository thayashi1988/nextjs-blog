import type { NextPage } from 'next';
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Date from 'src/components/date';
import { Btn } from 'src/components/Button/Btn';
import utilStyles from 'src/styles/utils.module.css';
import { Heading1 } from '@/components/Heading/Heading1';
import { Column } from '@/components/Column/Column';
import { ColumnItem } from '@/components/Column/ColumnItem';
import { auth } from '../../../firebase';

type Links = {
  href: string;
  linkTxt: string;
};

const LINKITEMS: Links[] = [
  {
    href: '/test/test',
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
  // {
  //   href: '/login/login',
  //   linkTxt: 'firebase Authentication',
  // },
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
    const authProcess = auth.onAuthStateChanged((firebaseDatas: any) => {
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
              <ColumnItem col="4" colSm="3" key={item.href} class="md:w-4/12">
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
      {/* <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className="text-blue-600 font-bold text-4xl mt-8 mb-5">Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a className="text-blue-500">{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section> */}
    </>
  );
};

export default Index;
