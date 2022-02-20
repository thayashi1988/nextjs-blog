import React, { memo } from 'react';
import { BtnDanger } from '@/components/Button/BtnDanger';
import { Text } from '@/components/Text/Text';
import { TextAlert } from '@/components/Text/TextAlert';
import { NextImg } from '@/components/Img/Img';
import { LoadingText } from '@/components/Loading/LoadingText';
import { Grid } from '@/components/Grid/Grid';
import { GridItem } from '@/components/Grid/GridItem';

type PROPS = {
  datas: string[];
  path: string[];
  loading: Boolean;
  createPath(data: string): React.MouseEventHandler<HTMLButtonElement> | any;
};

export const FirebaseStorageFiles: React.VFC<PROPS> = memo((props) => {
  // console.log('ファイルコンポーネントのレンダリング');
  const { datas, path, loading, createPath } = props;
  if (loading) {
    return <LoadingText />;
  }
  if (datas.length === 0) {
    return <TextAlert class="!mb-5">配下にファイルはありません。</TextAlert>;
  }
  return (
    <Grid class="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-5">
      {datas.map((data, index) => {
        return (
          <GridItem
            key={data}
            class="border border-gray-100 shadow-md rounded flex flex-col">
            <NextImg
              src={
                path[index]
                  ? path[index]
                  : 'https://via.placeholder.com/200/666666/FFFFFF?text=now+loading...'
              }
              alt={data}
              width="300"
              height="300"
            />
            <Text class="p-2 !mb-0 break-all">{data}</Text>
            <BtnDanger
              link={false}
              margin="!mb-2 mt-auto mx-2"
              click={() => createPath(data)}>
              削除
            </BtnDanger>
          </GridItem>
        );
      })}
    </Grid>
  );
});
