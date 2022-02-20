import React, { memo } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Text } from '@/components/Text/Text';
import { Btn } from '@/components/Button/Btn';
import { BtnSecondary } from '@/components/Button/BtnSecondary';
import { BtnSuccess } from '@/components/Button/BtnSuccess';
import { NextImg } from '@/components/Img/Img';
import { Heading1 } from '@/components/Heading/Heading1';
import { Heading2 } from '@/components/Heading/Heading2';
import { Heading3 } from '@/components/Heading/Heading3';
import { FirebaseStorageFiles } from '@/components/Firebase/FirebaseStorageFiles';
import { FirebaseStorageDirectorys } from '@/components/Firebase/FirebaseStorageDirectorys';
import { useMicromodal } from '@/components/Hooks/useMicromodal';
import { TextAlert } from '@/components/Text/TextAlert';
import { Grid } from '@/components/Grid/Grid';
import { GridItem } from '@/components/Grid/GridItem';
import { useStorageUp } from '@/components/Firebase/useStorageUp';
import { useStorageSearch } from '@/components/Firebase/useStorageSearch';
import { useStorageDelete } from '@/components/Firebase/useStorageDelete';
import { useStorageBackToRoot } from '@/components/Firebase/useStorageBackToRoot';
import { useStorageState } from '@/components/Firebase/useStorageState';
import { useStorageEffect } from '@/components/Firebase/useStorageEffect';

const Index: NextPage = () => {
  console.log('storageインデックのレンダリング');
  const { Modal, close } = useMicromodal('sample-modal');

  const {
    uploadedUrl,
    setUploadedUrl,
    progressBar,
    setProgressBar,
    deleteFileNameStr,
    setDeleteFileNameStr,
    deleteFilePathStr,
    setDeleteFilePathStr,
    storageDatas,
    setStorageDatas,
    storageDirs,
    setStorageDirs,
    storagelUrls,
    setStoragelUrls,
    oldDir,
    setOldDir,
    isLoading,
    setIsLoading,
  } = useStorageState();

  const { handleFileUp } = useStorageUp(setUploadedUrl, setProgressBar);

  const {
    storagelUrls: currentStoragelUrls,
    handleCreateFilePath,
    handleDirSearch,
  } = useStorageSearch(
    setStorageDatas,
    setStorageDirs,
    storagelUrls,
    setStoragelUrls,
    oldDir,
    setOldDir,
    setIsLoading,
    setDeleteFileNameStr,
    setDeleteFilePathStr
  );

  const { handleDirBackToTop } = useStorageBackToRoot(
    storageDatas,
    setStorageDatas,
    storageDirs,
    setStorageDirs,
    setOldDir,
    isLoading,
    setIsLoading
  );

  const { handleFileDelete } = useStorageDelete(
    deleteFilePathStr,
    storageDatas,
    setStorageDatas,
    setStoragelUrls,
    deleteFileNameStr,
    currentStoragelUrls
  );

  useStorageEffect(setStorageDirs, setStorageDatas, setIsLoading);

  // console.log('Index storagelUrls:', storagelUrls);
  // console.log('Index currentStoragelUrls:', currentStoragelUrls);
  console.log('Index deleteFilePathStr:', deleteFilePathStr);

  return (
    <>
      <Head>
        <title>ファイルアップ | Next.jsアプリ</title>
      </Head>
      <Heading1>ファイルアップ</Heading1>
      <Text class="!mb-8">
        Cloud Storage for
        Firebaseを使用して、画像のアップロード・削除ができるページです。
        <br />
        また、Google Cloud Storage List APIを使用して、
        <br />
        Cloud Storage for
        Firebaseに格納したファイルを確認できるように処理をしています。
      </Text>
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
      <div className="text-center shadow-lg border border-gray-300 mb-10 max-w-md mx-auto min-h-[200px] p-2">
        <Text>ここにアップロード画像が表示されます。</Text>
        {uploadedUrl ? (
          <NextImg
            src={
              uploadedUrl
                ? uploadedUrl
                : 'https://via.placeholder.com/200/666666/FFFFFF?text=now+loading...'
            }
            alt=""
            width="200"
            height="200"
            class="mb-8"
          />
        ) : null}
      </div>
      <Heading2 margin="sm:!mb-6">Storage表示</Heading2>
      <Heading3 margin="!mb-1">現在のディレクトリ</Heading3>
      <Text class="break-all !mb-5">
        https://firebasestorage.googleapis.com/v0/b/udemy-todo-f0672.appspot.com/o/
        <span className="text-cyan-500">{oldDir}</span>
      </Text>
      <Heading3 margin="!mb-2 sm:!mb-2">配下にあるファイル</Heading3>
      <FirebaseStorageFiles
        path={storagelUrls}
        datas={storageDatas}
        loading={isLoading}
        createPath={handleCreateFilePath}
      />
      <Heading3 margin="!mb-2 sm:!mb-2 mt-5">配下にあるディレクトリ</Heading3>
      <FirebaseStorageDirectorys
        datas={storageDirs}
        loading={isLoading}
        click={handleDirSearch}
      />
      <Btn
        link={false}
        margin="mt-5 sm:mt-5 text-center"
        click={handleDirBackToTop}>
        storageTOPに戻る
      </Btn>
      <Modal id="sample-modal">
        <TextAlert class="mb-6">画像をサーバーから削除しますか？</TextAlert>
        <Grid class="grid-cols-2 gap-4">
          <GridItem>
            <BtnSuccess link={false} click={handleFileDelete} margin="!mb-0">
              削除
            </BtnSuccess>
          </GridItem>
          <GridItem>
            <BtnSecondary link={false} click={close} margin="!mb-0">
              キャンセル
            </BtnSecondary>
          </GridItem>
        </Grid>
      </Modal>
    </>
  );
};

export default memo(Index);
