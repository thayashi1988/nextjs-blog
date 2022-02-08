import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { FBTest, storageRef } from '../../../firebase';
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
import { useMicromodal } from '@/components/Modal/';
import { TextAlert } from '@/components/Text/TextAlert';
import { Grid } from '@/components/Grid/Grid';
import { GridItem } from '@/components/Grid/GridItem';

const fileMetadata = {
  contentType: 'image/*',
};

// FirebaseStorageFilesに渡すダウンロードURL
let underItemslUrls = [];

export const Index: NextPage = (props) => {
  const { Modal, open, close } = useMicromodal('sample-modal');
  const [uploadedUrl, setUploadedUrl] = useState<string>('');
  const [deleteFileNameStr, setDeleteFileNameStr] = useState<string>('');
  const [deleteFilePathStr, setDeleteFilePathStr] = useState<string>('');
  const [storageDatas, setStorageDatas] = useState<string[]>([]);
  const [storageDirs, setStorageDirs] = useState<string[]>([]);
  const [storagelUrls, setStoragelUrls] = useState<string[]>([]);
  const [oldDir, setOldDir] = useState<string>('');
  const [progressBar, setProgressBar] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const imgRootRef = storageRef;
  const underItems = [];
  const underDirs = [];
  let clickedDir = '';

  useEffect(() => {
    let unmounted = false;
    imgRootRef
      .listAll()
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          underDirs.push(folderRef.name);
          res.items.forEach((itemRef) => {
            underItems.push(itemRef.name);
          });
        });
        setStorageDirs([...underDirs]);
        setStorageDatas([...underItems]);
        setIsLoading(underItems.length === 0 && underDirs.length === 0);
      })
      .catch((error) => {
        alert('useEffect エラーが発生しました。');
        console.log('useEffect error:', error);
      });
    return () => {
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileUp = () => {
    const file =
      document.querySelector<HTMLInputElement>('input[type="file"]').files[0];
    if (!file) {
      alert('アップロードファイルを選択してください。');
      return;
    }
    setProgressBar(1);
    const uploadTask = storageRef
      .child('images/' + file.name)
      .put(file, fileMetadata);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgressBar(progress);
        switch (snapshot.state) {
          case FBTest.storage.TaskState.PAUSED: // or 'paused'
            break;
          case FBTest.storage.TaskState.RUNNING: // or 'running'
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            setProgressBar(0);
            alert('エラーが発生しました。 unauthorized');
            break;
          case 'storage/canceled':
            setProgressBar(0);
            alert('エラーが発生しました。canceled');
            break;
          case 'storage/unknown':
            setProgressBar(0);
            alert('エラーが発生しました。unknown');
            break;
        }
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          setUploadedUrl(downloadURL);
          console.log('File available at', downloadURL);
          setProgressBar(100);
          alert('アップロードが完了しました。');
          setTimeout(() => {
            setProgressBar(0);
          }, 1000);
        });
      }
    );
  };

  const handleDirBackToTop = () => {
    setStorageDatas([]);
    setStorageDirs([]);
    setIsLoading(true);
    setOldDir('');
    const backToTopItems = [];
    const backToTopDirs = [];

    imgRootRef
      .listAll()
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          backToTopDirs.push(folderRef.name);
          res.items.forEach((itemRef) => {
            backToTopItems.push(itemRef.name);
          });
        });
        setStorageDirs([...backToTopDirs]);
        setStorageDatas([...backToTopItems]);
        setIsLoading(backToTopItems.length === 0 && backToTopDirs.length === 0);
      })
      .catch((error) => {
        alert('handleDirBackToTop エラーが発生しました。');
        console.log('handleDirBackToTop error:', error);
      });
  };

  const handleDirSearch = (e: any) => {
    setStorageDatas([]);
    setStorageDirs([]);
    setStoragelUrls([]);
    setIsLoading(true);

    clickedDir = e.target.value;
    if (/\//.test(oldDir)) {
      setOldDir(`${clickedDir}`);
    } else {
      setOldDir((prev) => `${prev}/${clickedDir}`);
    }
    const dirRef = storageRef.child(`${clickedDir}`);
    const searchUnderItems = [];
    const searchUnderDirs = [];
    underItemslUrls = [];
    dirRef
      .listAll()
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          searchUnderDirs.push(`${clickedDir}/${folderRef.name}`);
        });
        res.items.forEach((itemRef) => {
          searchUnderItems.push(`${itemRef.name}`);
        });
        setStorageDirs([...searchUnderDirs]);
        setStorageDatas([...searchUnderItems]);
        setIsLoading(storageDatas.length === 0 && storageDirs.length === 0);
        console.log('handleDirSearchのファイル・ディレクトリ取得のthen');
      })
      .then(() => {
        console.log('ここはそのthenをさらにthenでつないだ場所');
        getUrlOnebyOne(clickedDir, searchUnderItems);
      })
      .catch((error) => {
        alert('handleDirSearch エラーが発生しました。');
        console.log('handleDirSearch error:', error);
      });
  };

  const getUrlOnebyOne = async (
    directory: string,
    fileNames: string[]
  ): Promise<void> => {
    for (let i = 0; i < fileNames.length; i++) {
      const imgRef = storageRef.child(`${directory}/${fileNames[i]}`);
      const imgUrl = imgRef.getDownloadURL();
      await imgUrl.then((url) => {
        underItemslUrls.push(url);
      });
    }
    setStoragelUrls([...underItemslUrls]);
  };

  const handleCreateFilePath = (data: string): void => {
    open();
    setDeleteFileNameStr(data);
    setDeleteFilePathStr(`${oldDir}/${data}`);
  };

  const handleFileDelete = () => {
    console.log('deleteFilePathStr:', deleteFilePathStr);
    const deleteRef = storageRef.child(deleteFilePathStr);
    const deletedUnderItemslUrls = underItemslUrls.filter((prev) => {
      return prev.indexOf(deleteFileNameStr) === -1;
    });
    const deletedStorageDatas = storageDatas.filter((prev) => {
      return prev.indexOf(deleteFileNameStr) === -1;
    });
    underItemslUrls = [...deletedUnderItemslUrls];
    setStorageDatas([...deletedStorageDatas]);
    console.log('最後 underItemslUrls:', underItemslUrls);
    deleteRef
      .delete()
      .then(() => {
        alert('削除が完了しました。');
        close();
      })
      .catch((error) => {
        alert('handleDelete エラーが発生しました。');
        console.log('handleDelete error:', error);
      });
  };

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
        path={underItemslUrls}
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

export default Index;
