import React from 'react';
import { TextAlert } from '@/components/Text/TextAlert';
import { LoadingText } from '@/components/Loading/LoadingText';

type PROPS = {
  datas: string[];
  loading: Boolean;
  value?: string;
  click: React.MouseEventHandler<HTMLInputElement>;
};

export const FirebaseStorageDirectorys: React.VFC<PROPS> = (props) => {
  if (props.loading) {
    return <LoadingText />;
  }
  if (props.datas.length === 0) {
    return <TextAlert>配下にディレクトリはありません。</TextAlert>;
  }
  return (
    <>
      {props.datas.map((data) => {
        return (
          <div className="-mt-2" key={data}>
            <input
              className="text-sm cursor-pointer sm:hover:opacity-80 text-blue-400 inline-block mb-2"
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
