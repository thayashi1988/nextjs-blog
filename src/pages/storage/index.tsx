import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { FBTest, storageRef } from '../../../firebase';
import { Text } from '@/components/Text/Text';
import { Btn } from '@/components/Button/Btn';
import { NextImg } from '@/components/Img/Img';
import { Heading2 } from '@/components/Heading/Heading2';
import { FirebaseStorageFiles } from '@/components/Firebase/FirebaseStorageFiles';
import { FirebaseStorageDirectorys } from '@/components/Firebase/FirebaseStorageDirectorys';

const fileMetadata = {
  contentType: 'image/*',
};

export const Index: NextPage = (props) => {
  const [uploadedUrl, setUploadedUrl] = useState<string>('');
  const [storageDatas, setStorageDatas] = useState<string[]>([]);
  const [storageDir, setStorageDir] = useState<string[]>([]);
  const [oldDir, setOldDir] = useState<string>('');
  const [prog, setProg] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const imgRootRef = storageRef;
  const underItems = [];
  const underDirs = [];
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
        setStorageDir([...underDirs]);
        setStorageDatas([...underItems]);
        setIsLoading(underItems.length === 0 && underDirs.length === 0);
        console.log('underDirs:', underDirs);
        console.log('storageDir:', storageDir);
        console.log('isLoading:', isLoading);
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
    setProg(1);
    const file =
      document.querySelector<HTMLInputElement>('input[type="file"]').files[0];
    if (!file) {
      alert('アップロードファイルを選択してください。');
      return;
    }
    const uploadTask = storageRef
      .child('images/' + file.name)
      .put(file, fileMetadata);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProg(progress);
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
            setProg(0);
            alert('エラーが発生しました。 unauthorized');
            break;
          case 'storage/canceled':
            setProg(0);
            alert('エラーが発生しました。canceled');
            break;
          case 'storage/unknown':
            setProg(0);
            alert('エラーが発生しました。unknown');
            break;
        }
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          setUploadedUrl(downloadURL);
          console.log('File available at', downloadURL);
          setProg(100);
          alert('アップロードが完了しました。');
          setTimeout(() => {
            setProg(0);
          }, 1000);
        });
      }
    );
  };

  const handleDirBackToTop = () => {
    setStorageDatas([]);
    setStorageDir([]);
    setIsLoading(true);
    setOldDir('');
    const imgRootRef = storageRef;
    const underItems = [];
    const underDirs = [];

    imgRootRef
      .listAll()
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          underDirs.push(folderRef.name);
          res.items.forEach((itemRef) => {
            underItems.push(itemRef.name);
          });
        });
        setStorageDir([...underDirs]);
        setStorageDatas([...underItems]);
        setIsLoading(underItems.length === 0 && underDirs.length === 0);
      })
      .catch((error) => {
        alert('handleDirBackToTop エラーが発生しました。');
        console.log('handleDirBackToTop error:', error);
      });
  };

  const handleDirSearch = (e: any) => {
    setStorageDatas([]);
    setStorageDir([]);
    setIsLoading(true);

    const clickedDir = e.target.value;
    if (/\//.test(oldDir)) {
      setOldDir(`${clickedDir}`);
    } else {
      setOldDir((prev) => `${prev}/${clickedDir}`);
    }
    const imgRootRef = storageRef.child(`${clickedDir}`);
    const underItems = [];
    const underDirs = [];
    imgRootRef
      .listAll()
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          underDirs.push(`${clickedDir}/${folderRef.name}`);
        });
        res.items.forEach((itemRef) => {
          underItems.push(`${itemRef.name}`);
        });
        setStorageDir([...underDirs]);
        setStorageDatas([...underItems]);
        setIsLoading(storageDatas.length === 0 && storageDir.length === 0);
      })
      .catch((error) => {
        alert('handleDirSearch エラーが発生しました。');
        console.log('handleDirSearch error:', error);
      });
  };

  return (
    <>
      <Head>
        <title>ファイルアップ | Next.jsアプリ</title>
      </Head>
      <Heading2>ファイルアップロード</Heading2>
      <div className="flex flex-col sm:flex-row items-start mb-4 sm:mb-8">
        <label htmlFor="" className="block w-full max-w-[320px]">
          <input type="file" className="w-full" />
        </label>
        <Btn
          link={false}
          class="mt-3 sm:mt-0"
          margin="mb-0 w-full sm:max-w-xs"
          click={handleFileUp}>
          アップロード
        </Btn>
      </div>
      {prog !== 0 ? (
        <Text>
          アップロード中・・・{`${prog}%`}
          <span
            className={`block h-5 bg-gray-200 rounded`}
            style={{ width: `${prog}%` }}></span>
        </Text>
      ) : null}
      <div className="text-center shadow-lg border border-gray-300 mb-10 max-w-md mx-auto min-h-[200px]">
        <Text>ここにアップロード画像が表示されます。</Text>
        {uploadedUrl ? (
          <NextImg
            src={
              uploadedUrl
                ? uploadedUrl
                : 'https://via.placeholder.com/200/771796'
            }
            alt=""
            width="200"
            height="200"
            class="mb-8"
          />
        ) : null}
      </div>
      <Heading2>Storage表示</Heading2>
      <div className="text-left">
        <Text class="break-all">
          現在のディレクトリ
          <br />
          {`https://firebasestorage.googleapis.com/v0/b/udemy-todo-f0672.appspot.com/o/${oldDir}`}
        </Text>
        <Text>配下にあるファイル・ディレクトリ</Text>
        <FirebaseStorageFiles datas={storageDatas} loading={isLoading} />
        <FirebaseStorageDirectorys
          datas={storageDir}
          loading={isLoading}
          click={handleDirSearch}
        />
        <Btn link={false} click={handleDirBackToTop}>
          storageTOPに戻る
        </Btn>
      </div>
    </>
  );
};

export default Index;
