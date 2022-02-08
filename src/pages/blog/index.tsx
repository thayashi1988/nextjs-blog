import React from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { Text } from '@/components/Text/Text';
import { NextImg } from '@/components/Img/Img';
import { NextLink } from '@/components/Link/Link';
import { Heading1 } from '@/components/Heading/Heading1';
import { List } from '@/components/List/List';
import { ListItem } from '@/components/List/ListItem';

type MICROCMSDATA = {
  contents: [];
  limit: number;
  offset: number;
  totalCount: number;
  children?: React.ReactNode;
};

type ARTICLEDATA = [{ fieldId: string; rich?: string; html?: string }];

type BLOGDATA = {
  body: ARTICLEDATA;
  category: number;
  createdAt: number;
  date: number;
  id: string;
  publishedAt: string;
  revisedAt: string;
  thumb: boolean;
  thumbImg: {
    url: string;
    height: number;
    width: number;
  };
  title: string;
  updatedAt: string;
};

export const getStaticProps: GetStaticProps = async () => {
  const limit = 5;
  const key = {
    headers: { 'X-API-KEY': `${process.env.MICROCMS_API_KEY}` },
  };
  const data = await fetch(
    `${process.env.MICROCMS_API_URL}/blog?limit=${limit}`,
    key
  );
  const res: MICROCMSDATA = await data.json();
  return {
    props: {
      blogData: res,
    },
  };
};

const Index: InferGetStaticPropsType<typeof getStaticProps> = ({
  blogData,
}) => {
  const blogDatas: MICROCMSDATA = blogData;
  const blogContents: BLOGDATA[] = blogDatas.contents;
  // console.log('blogDatas:', blogDatas);
  // console.log('blogContents:', blogContents);

  return (
    <div>
      <Head>
        <title>microCMS読み込み | Next.jsアプリ</title>
      </Head>
      <Heading1>microCMS読み込み</Heading1>
      <Text>
        ヘッドレスCMSの「microCMS」に登録されている記事データを表示させています。
        <br />
        SSG (Static Site
        Generation)で生成しているので、アプリビルド時にデータの取得を行いHTMLを生成し表示させています。
      </Text>
      <List>
        <ListItem mark="※" class="!text-[14px]">
          勉強用のもののため、表示は最新5件としています。
        </ListItem>
      </List>
      <ul className="sm:flex sm:flex-wrap sm:justify-start">
        {blogContents.map((contents) => (
          <li className="sm:flex-initial p-2 sm:w-4/12" key={contents.id}>
            <NextLink
              class="block w-full h-full rounded p-2 shadow-lg text-sm dark:bg-white dark:text-black"
              href={`/blog/${contents.id}`}>
              <NextImg
                class="mb-2"
                src={contents.thumbImg.url}
                width={contents.thumbImg.width}
                height={contents.thumbImg.height}
              />
              {contents.title}
            </NextLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
