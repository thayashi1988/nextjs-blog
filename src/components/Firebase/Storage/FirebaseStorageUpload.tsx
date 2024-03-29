import React, { memo } from 'react';
import { Text } from '@/components/Text/Text';
import { Btn } from '@/components/Button/Btn';
import { NextImg } from '@/components/Img/Img';

type PROPS = {
  progressBar: number;
  uploadedUrl: string;
  handleMakeDir: React.ChangeEventHandler<HTMLInputElement>;
  handleFileUp: React.MouseEventHandler<HTMLButtonElement>;
};

export const FirebaseStorageUpload: React.VFC<PROPS> = memo((props) => {
  const { handleFileUp, handleMakeDir, progressBar, uploadedUrl } = props;
  return (
    <>
      <div className="flex flex-col items-center justify-center mb-4 sm:mb-8">
        <div className="flex flex-col sm:flex-row items-center">
          <label htmlFor="" className="block w-full text-sm">
            <input type="file" className="next-input-file w-full" />
          </label>
          <label htmlFor="" className="block w-full text-sm mt-4 sm:mt-0">
            ファイルアップするディレクトリを作成する
            {/* https://firebasestorage.googleapis.com/v0/b/udemy-todo-f0672.appspot.com/o/ */}
            <input
              type="text"
              onChange={handleMakeDir}
              className="next-input-text w-full border border-gray-500 rounded-md p-2"
            />
          </label>
        </div>
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
        {uploadedUrl ? (
          <NextImg
            src={uploadedUrl}
            alt=""
            width="200"
            height="200"
            class="mb-8"
          />
        ) : null}
      </div>
    </>
  );
});
