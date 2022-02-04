import React from 'react';
import { LoadingText } from '@/components/Loading/LoadingText';
import { Text } from '../Text/Text';
import { NextImg } from '../Img/Img';

type PROPS = {
  datas: string[];
  path: string[];
  loading: Boolean;
  children?: React.ReactNode;
};

const storagePath =
  'https://firebasestorage.googleapis.com/v0/b/udemy-todo-f0672.appspot.com/o/';

export const FirebaseStorageFiles: React.VFC<PROPS> = (props) => {
  console.log('props.path[0]:', props.path[0]);
  if (props.loading) {
    return <LoadingText />;
  }
  return (
    <>
      {props.datas.map((data, index) => {
        return (
          <div key={data}>
            <NextImg
              src={
                props.path[0]
                  ? props.path[0]
                  : 'https://via.placeholder.com/200/771796'
              }
              alt={data}
              width="300"
              height="300"
            />
            <Text class="pl-3 mb-2">{data}</Text>
          </div>
        );
      })}
    </>
  );
};
