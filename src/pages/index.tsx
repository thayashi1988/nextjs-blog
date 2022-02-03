import { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import { siteSettings } from '@/components/Layout/layout';
import { getSortedPostsData } from 'src/lib/posts';
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

const Home: NextPage<Props> = ({ allPostsData, props }) => {
  return (
    <>
      <Head>
        <title>{siteSettings.siteTitle}</title>
      </Head>
      <section className="shadow-gray-300/50 shadow-xl">
        <Column class="mb-0">
          <ColumnItem col="6" class="pr-0">
            <div className="h-full bg-[url('https://source.unsplash.com/random')] bg-no-repeat bg-cover bg-center"></div>
          </ColumnItem>
          <ColumnItem col="6" class="pl-0">
            <div className="h-full p-4">
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
    </>
  );
};

export default Home;
