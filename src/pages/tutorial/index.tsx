import React from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { Text } from '@/components/Text/Text';
import { Heading1 } from '@/components/Heading/Heading1';
import { Heading2 } from '@/components/Heading/Heading2';
import { NextLink } from '@/components/Link/Link';
import utilStyles from '@/styles/utils.module.css';
import Date from '@/components/date';
import { getSortedPostsData } from '@/lib/posts';

type POSTDATAS = {
  id: string;
  date: string;
  title: string;
}[];
interface PROPS {
  allPostsData?: POSTDATAS;
  props?: any;
}

export const getStaticProps: GetStaticProps = () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

const Index: InferGetStaticPropsType<typeof getStaticProps> = ({
  allPostsData,
}) => {
  return (
    <div>
      <Head>
        <title>Next.js チュートリアル | Next.jsアプリ</title>
      </Head>
      <Heading1>Next.js チュートリアル</Heading1>
      <Text class="!mb-0">
        以下Next.jsの公式サイトのチュートリアルを対応したページです。
      </Text>
      <NextLink
        target
        href="https://nextjs.org/learn/basics/create-nextjs-app?utm_source=next-site&utm_medium=homepage-cta&utm_campaign=next-website">
        https://nextjs.org/learn/basics/create-nextjs-app?utm_source=next-site&utm_medium=homepage-cta&utm_campaign=next-website
      </NextLink>
      <Heading2 margin="mt-8 !mb-2">
        /tutorial/posts内のマークダウンファイル記事
      </Heading2>
      <ul className={utilStyles.list}>
        {allPostsData.map(({ id, date, title }) => (
          <li className={utilStyles.listItem} key={id}>
            <NextLink href={`/tutorial/${id}`} margin="!mb-0">
              {title}
            </NextLink>
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
