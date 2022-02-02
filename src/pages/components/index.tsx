import type { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import { Text } from '@/components/Text/Text';
import { TextAlert } from '@/components/Text/TextAlert';
import { NextLink } from '@/components/Link/Link';
import { Heading1 } from '@/components/Heading/Heading1';
import { Heading2 } from '@/components/Heading/Heading2';
import { Heading3 } from '@/components/Heading/Heading3';
import { Heading4 } from '@/components/Heading/Heading4';
import { HeadingComponent } from '@/components/Heading/HeadingComponent';
import { Btn } from '@/components/Button/Btn';
import { BtnSecondary } from '@/components/Button/BtnSecondary';
import { BtnSuccess } from '@/components/Button/BtnSuccess';
import { BtnDanger } from '@/components/Button/BtnDanger';
import { BtnInfo } from '@/components/Button/BtnInfo';
import { List } from '@/components/List/List';
import { ListItem } from '@/components/List/ListItem';
import { Column } from '@/components/Column/Column';
import { ColumnItem } from '@/components/Column/ColumnItem';

export const Index: NextPage = () => {
  return (
    <div>
      <Head>
        <title>コンポーネント集</title>
      </Head>
      <HeadingComponent>見出しコンポーネント</HeadingComponent>
      <Heading1>見出し1 margin-bottom: PC:3rem MD:2rem</Heading1>
      <Heading2>見出し2 margin-bottom: PC:2.5rem MD:1.5rem</Heading2>
      <Heading3>見出し3 margin-bottom: PC:1rem MD:1rem</Heading3>
      <Heading4>見出し4 margin-bottom: PC:0.5rem MD:0.5rem</Heading4>
      <HeadingComponent class="mt-8">テキストコンポーネント</HeadingComponent>
      <Text>通常テキスト margin-bottom: PC:1.5rem MD:1.5rem</Text>
      <TextAlert>アラートテキスト margin-bottom: PC:1.5rem MD:1.5rem</TextAlert>
      <HeadingComponent class="mt-8">リンクコンポーネント</HeadingComponent>
      <NextLink href="/components">
        リンクテキスト margin-bottom: PC:1.5rem MD:1.5rem
      </NextLink>
      <NextLink target href="/components">
        外部リンクテキスト margin-bottom: PC:1.5rem MD:1.5rem
      </NextLink>
      <HeadingComponent class="mt-8">ボタンコンポーネント</HeadingComponent>
      <Btn link={false}>ボタン margin-bottom: PC:1.25rem MD:1.25rem</Btn>
      <BtnSecondary link={false}>
        セカンダリーボタン margin-bottom: PC:1.25rem MD:1.25rem
      </BtnSecondary>
      <BtnSuccess link={false}>
        サクセスボタン margin-bottom: PC:1.25rem MD:1.25rem
      </BtnSuccess>
      <BtnDanger link={false}>
        デンジャーボタン margin-bottom: PC:1.25rem MD:1.25rem
      </BtnDanger>
      <BtnInfo link={false}>
        インフォボタン margin-bottom: PC:1.25rem MD:1.25rem
      </BtnInfo>
      <HeadingComponent class="mt-8">リストコンポーネント</HeadingComponent>
      <List>
        <ListItem mark="・">
          リストアイテム margin-bottom: PC:0.25rem MD:0.25rem
        </ListItem>
        <ListItem mark="※" small={true}>
          リストアイテム 注釈 font-size: PC:0.875rem MD:0.875rem
        </ListItem>
      </List>
      <HeadingComponent class="mt-8">カラムコンポーネント</HeadingComponent>
      <Column>
        <ColumnItem col="6">
          <Text>左カラム</Text>
        </ColumnItem>
        <ColumnItem col="6">
          <Text>右カラム</Text>
        </ColumnItem>
        <ColumnItem col="6">
          <Text>右カラム</Text>
        </ColumnItem>
        <ColumnItem col="6">
          <Text>右カラム</Text>
        </ColumnItem>
      </Column>
    </div>
  );
};

export default Index;
