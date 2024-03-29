import React, { memo } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Text } from '@/components/Text/Text';
import { Btn } from '@/components/Button/Btn';
import { Heading1 } from '@/components/Heading/Heading1';
import { Heading2 } from '@/components/Heading/Heading2';
import { Heading3 } from '@/components/Heading/Heading3';
import { FirebaseStorageFiles } from '@/components/Firebase/Storage/FirebaseStorageFiles';
import { FirebaseStorageDirectorys } from '@/components/Firebase/Storage/FirebaseStorageDirectorys';
import { FirebaseStorageUpload } from '@/components/Firebase/Storage/FirebaseStorageUpload';
import { FirebaseStorageModal } from '@/components/Firebase/Storage/FirebaseStorageModal';
import { useStorageState } from '@/components/Firebase/Storage/Hooks/useStorageState';
import { useStorageEffect } from '@/components/Firebase/Storage/Hooks/useStorageEffect';
import { useStorageUp } from '@/components/Firebase/Storage/Hooks/useStorageUp';
import { useStorageSearch } from '@/components/Firebase/Storage/Hooks/useStorageSearch';
import { useStorageBackToRoot } from '@/components/Firebase/Storage/Hooks/useStorageBackToRoot';
import { useStorageDelete } from '@/components/Firebase/Storage/Hooks/useStorageDelete';

const Index: NextPage = () => {
  // console.log('storageインデックのレンダリング');
  const { ...STATES } = useStorageState();
  const { handleFileUp, handleMakeDir } = useStorageUp(STATES);
  const { handleCreateFilePath, handleDirSearch } = useStorageSearch(STATES);
  const { handleDirBackToTop } = useStorageBackToRoot(STATES);
  const { handleFileDelete } = useStorageDelete(STATES);
  useStorageEffect(STATES);

  // console.log('Index storagelUrls:', storagelUrls);
  // console.log('Index currentStoragelUrls:', currentStoragelUrls);
  // console.log('Index deleteFilePathStr:', deleteFilePathStr);
  // console.log('STATES.oldDir:', STATES.oldDir);
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
      <Heading3 margin="!mb-1">現在のディレクトリ</Heading3>
      <Text class="break-all !mb-5">
        https://firebasestorage.googleapis.com/v0/b/udemy-todo-f0672.appspot.com/o/
        <span className="text-cyan-500">{STATES.oldDir}</span>
      </Text>
      <FirebaseStorageUpload
        handleMakeDir={handleMakeDir}
        handleFileUp={handleFileUp}
        progressBar={STATES.progressBar}
        uploadedUrl={STATES.uploadedUrl}
      />
      <Heading2 margin="sm:!mb-6">Storage表示</Heading2>
      {STATES.oldDir !== '' ? (
        <>
          <Heading3 margin="!mb-2 sm:!mb-2">
            {STATES.oldDir}配下にあるファイル
          </Heading3>
          <FirebaseStorageFiles
            path={STATES.storageUrls}
            datas={STATES.storageDatas}
            loading={STATES.isLoading}
            createPath={handleCreateFilePath}
          />
        </>
      ) : null}
      <Heading3 margin="!mb-2 sm:!mb-2 mt-5">
        {STATES.oldDir}配下にあるディレクトリ
      </Heading3>
      <FirebaseStorageDirectorys
        datas={STATES.storageDirs}
        loading={STATES.isLoading}
        click={handleDirSearch}
      />
      <Btn
        disabled={STATES.oldDir === ''}
        link={false}
        margin="mt-5 sm:mt-5 text-center"
        click={handleDirBackToTop}>
        storageのrootに戻る
      </Btn>
      <FirebaseStorageModal handleFileDelete={handleFileDelete} />
    </>
  );
};

export default memo(Index);
