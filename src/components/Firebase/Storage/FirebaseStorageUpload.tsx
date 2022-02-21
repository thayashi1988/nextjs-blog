import React, { memo } from 'react';
import { Text } from '@/components/Text/Text';
import { Btn } from '@/components/Button/Btn';
import { NextImg } from '@/components/Img/Img';

type PROPS = {
  progressBar: number;
  uploadedUrl: string;
  handleFileUp: React.MouseEventHandler<HTMLButtonElement>;
};

export const FirebaseStorageUpload: React.VFC<PROPS> = memo((props) => {
  const { handleFileUp, progressBar, uploadedUrl } = props;
  return (
    <>
      <div className="flex flex-col items-center justify-center mb-4 sm:mb-8">
        <label htmlFor="" className="block w-full max-w-[320px]">
          <input type="file" className="w-full" />
        </label>
        <Btn
          link={false}
          class="mt-3"
          margin="mb-0 w-full sm:max-w-xs"
          click={handleFileUp}>
          アップロード
        </Btn>
      </div>
      {progressBar !== 0 ? (
        <Text>
          アップロード中・・・{`${progressBar}%`}
          <span
            className={`block h-5 bg-gray-200 rounded`}
            style={{ width: `${progressBar}%` }}></span>
        </Text>
      ) : null}
      <div className="text-center shadow-lg border border-gray-100 mb-10 max-w-md mx-auto min-h-[200px] p-2 rounded-md">
        <Text>ここにアップロード画像が表示されます。</Text>
        {
          uploadedUrl ? (
            <NextImg
              src={uploadedUrl}
              alt=""
              width="200"
              height="200"
              class="mb-8"
            />
          ) : null
          // <div className="flex justify-center items-center relative mt-2 h-40">
          //   <div className="h-10 w-10 border-4 border-gray-500 rounded-full opacity-25 absolute"></div>
          //   <span
          //     className="animate-spin h-10 w-10 border-4 border-gray-500 rounded-full"
          //     style={{ borderTopColor: 'transparent' }}></span>
          // </div>
        }
      </div>
    </>
  );
});
