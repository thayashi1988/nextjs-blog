import React from 'react';
import { LoadingText } from '@/components/Loading/LoadingText';
import { Text } from '@/components/Text/Text';
import { TextAlert } from '@/components/Text/TextAlert';
import { NextImg } from '@/components/Img/Img';
import { Grid } from '@/components/Grid/Grid';
import { GridItem } from '@/components/Grid/GridItem';

type PROPS = {
  datas: string[];
  path: string[];
  loading: Boolean;
  children?: React.ReactNode;
};

// const storagePath =
//   'https://firebasestorage.googleapis.com/v0/b/udemy-todo-f0672.appspot.com/o/';

export const FirebaseStorageFiles: React.VFC<PROPS> = (props) => {
  if (props.loading) {
    return <LoadingText />;
  }
  if (props.datas.length === 0) {
    return <TextAlert class="!mb-5">配下にファイルはありません。</TextAlert>;
  }
  return (
    <Grid class="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-5">
      {props.datas.map((data, index) => {
        return (
          <GridItem key={data} class="border border-gray-100 shadow-md rounded">
            <NextImg
              src={
                props.path[index]
                  ? props.path[index]
                  : 'https://via.placeholder.com/200/666666/FFFFFF?text=now+loading...'
              }
              alt={data}
              width="300"
              height="300"
            />
            <Text class="p-2 !mb-0 break-all">{data}</Text>
          </GridItem>
        );
      })}
    </Grid>
  );
};
