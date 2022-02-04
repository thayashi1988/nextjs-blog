import React from 'react';
import { LoadingText } from '@/components/Loading/LoadingText';
import { Text } from '../Text/Text';

type PROPS = {
  datas: string[];
  loading: Boolean;
  value?: string;
  click: React.MouseEventHandler<HTMLInputElement>;
  // children: React.ReactNode;
};

export const FirebaseStorageDirectorys: React.VFC<PROPS> = (props) => {
  if (props.loading) {
    return <LoadingText />;
  }
  return (
    <>
      {props.datas.map((data) => {
        return (
          <div className="-mt-2" key={data}>
            <input
              className="text-sm cursor-pointer sm:hover:opacity-80 text-blue-400 pl-3 inline-block mb-2"
              type="button"
              value={data}
              onClick={props.click}
            />
            <span className="text-xs">ディレクトリ</span>
          </div>
        );
      })}
    </>
  );
};
