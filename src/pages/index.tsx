import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Date from 'src/components/date';
import { siteSettings } from '@/components/Layout/layout';
import { Btn } from 'src/components/Button/Btn';
import { getSortedPostsData } from 'src/lib/posts';
import utilStyles from 'src/styles/utils.module.css';
import { Column } from '@/components/Column/Column';
import { ColumnItem } from '@/components/Column/ColumnItem';
import { NextImg } from '@/components/Img/Img';
import { Heading1 } from '@/components/Heading/Heading1';
import {
  LoginGoogle,
  LoginFacebook,
  LoginYahoo,
  LoginGithub,
} from '@/components/Login/Login';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

type postDatas = {
  id: string;
  date: string;
  title: string;
}[];
interface Props {
  allPostsData?: postDatas;
  props?: any;
}

type Links = {
  href: string;
  linkTxt: string;
};

const LINKITEMS: Links[] = [
  {
    href: '/test/test',
    linkTxt: 'テストページへ',
  },
  {
    href: '/weather/weather',
    linkTxt: '天気予報ページへ',
  },
  {
    href: '/database/database',
    linkTxt: 'firebase読み込み',
  },
  {
    href: '/login/login',
    linkTxt: 'Googleログイン',
  },
  {
    href: '/signin',
    linkTxt: 'チャットアプリへ',
  },
  {
    href: '/hunter',
    linkTxt: 'ハンターハンターへ',
  },
  {
    href: '/material',
    linkTxt: 'materialUIサンプルへ',
  },
  {
    href: '/blog',
    linkTxt: 'microCMSへ',
  },
  {
    href: '/qin',
    linkTxt: 'React講座',
  },
  {
    href: '/components',
    linkTxt: 'コンポーネントページ',
  },
];

const Home: NextPage<Props> = ({ allPostsData, props }) => {
  return (
    <>
      <Head>
        <title>{siteSettings.siteTitle}</title>
      </Head>
      <section>
        <Column>
          <ColumnItem col="6" class="pr-0">
            <div className="h-full bg-[url('https://source.unsplash.com/random')] bg-no-repeat bg-cover bg-center"></div>
          </ColumnItem>
          <ColumnItem col="6" class="pl-0">
            <div className="h-full shadow-black-500/50 shadow-lg p-4">
              <NextImg
                class="w-[40px] h-[40px] mx-auto mb-3"
                src="/images/icon/icon_login.svg"
                alt=""
                width="128"
                height="128"
              />
              <Heading1 class="text-center">ログイン</Heading1>
              <Column>
                <ColumnItem col="6" class="pr-0">
                  <LoginGoogle />
                </ColumnItem>
                <ColumnItem col="6" class="pr-0">
                  <LoginFacebook />
                </ColumnItem>
                <ColumnItem col="6" class="pr-0">
                  <LoginYahoo />
                </ColumnItem>
                <ColumnItem col="6" class="pr-0">
                  <LoginGithub />
                </ColumnItem>
              </Column>
            </div>
          </ColumnItem>
        </Column>
      </section>

      <section>
        <h2 className="text-blue-600 font-bold text-4xl mt-8 mb-5">
          勉強ページ
        </h2>
        <ul className="sm:flex sm:flex-wrap sm:justify-start">
          {LINKITEMS.map((link) => {
            return (
              <li key={link.href} className="sm:flex-initial p-2 sm:w-3/12">
                <Btn link href={link.href} class="w-full text-center">
                  {link.linkTxt}
                </Btn>
              </li>
            );
          })}
        </ul>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
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
      </section>
    </>
  );
};

export default Home;
