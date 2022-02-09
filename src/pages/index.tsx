import React from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { siteSettings } from '@/components/Layout/layout';
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

export const Home: NextPage = () => {
  const router = useRouter();
  const handleRouteLoading = () => {
    router.push('/loading');
  };

  return (
    <>
      <Head>
        <title>{siteSettings.siteTitle}</title>
      </Head>
      <section className="shadow-gray-300/50 shadow-xl border border-gray-200 rounded-md max-w-3xl mx-auto">
        <Column class="mb-0">
          <ColumnItem class="pr-0 pt-0 sm:w-6/12 md:w-6/12">
            <div className="h-full bg-[url('https://source.unsplash.com/random')] bg-no-repeat bg-cover bg-center"></div>
          </ColumnItem>
          <ColumnItem class="pl-0 sm:w-6/12 md:w-6/12">
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
                <ColumnItem class="pr-0 sm:w-6/12 md:w-6/12">
                  <LoginGoogle click={handleRouteLoading} />
                </ColumnItem>
                <ColumnItem class="pr-0 sm:w-6/12 md:w-6/12">
                  {/* <LoginFacebook /> */}
                </ColumnItem>
                <ColumnItem class="pr-0 sm:w-6/12 md:w-6/12">
                  {/* <LoginYahoo /> */}
                </ColumnItem>
                <ColumnItem class="pr-0 sm:w-6/12 md:w-6/12">
                  {/* <LoginGithub /> */}
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
