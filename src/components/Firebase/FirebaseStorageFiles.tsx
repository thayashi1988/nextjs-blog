import React from 'react';
import { LoadingText } from '@/components/Loading/LoadingText';
import { Text } from '../Text/Text';

type PROPS = {
  datas: string[];
  loading: Boolean;
  children?: React.ReactNode;
};

export const FirebaseStorageFiles: React.VFC<PROPS> = (props) => {
  console.log('props.loading):', props.loading);
  if (props.loading) {
    return <LoadingText />;
  }
  return (
    <>
      {props.datas.map((data) => {
        return (
          <Text key={data} class="pl-3 mb-2">
            {data}
          </Text>
        );
      })}
    </>
  );
};
