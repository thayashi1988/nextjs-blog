import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { FBTest, storageRef } from '../../../firebase';
import { Text } from '@/components/Text/Text';
import { Btn } from '@/components/Button/Btn';
import { NextImg } from '@/components/Img/Img';
import { Heading1 } from '@/components/Heading/Heading1';
import { Heading2 } from '@/components/Heading/Heading2';
import { Heading3 } from '@/components/Heading/Heading3';
import { FirebaseStorageFiles } from '@/components/Firebase/FirebaseStorageFiles';
import { FirebaseStorageDirectorys } from '@/components/Firebase/FirebaseStorageDirectorys';

const fileMetadata = {
  contentType: 'image/*',
};

let underItemslUrls = [];

export const Index: NextPage = (props) => {
  const [uploadedUrl, setUploadedUrl] = useState<string>('');
  const [storageDatas, setStorageDatas] = useState<string[]>([]);
  const [storageDirs, setStorageDirs] = useState<string[]>([]);
  const [storagelUrls, setStoragelUrls] = useState<string[]>([]);
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
        setStorageDirs([...underDirs]);
        setStorageDatas([...underItems]);
        setIsLoading(underItems.length === 0 && underDirs.length === 0);
        // console.log('underDirs:', underDirs);
        // console.log('storageDirs:', storageDirs);
        // console.log('isLoading:', isLoading);
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
    setProg(1);
    const uploadTask = storageRef
      .child('images/' + file.name)
      .put(file, fileMetadata);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
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
    setStorageDirs([]);
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
        setStorageDirs([...underDirs]);
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
    setStorageDirs([]);
    setStoragelUrls([]);
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
    underItemslUrls = [];
    // const underItemslUrls = [];
    // console.log(
    //   'imgRootRef[0].getDownloadURL():',
    //   imgRootRef[0].getDownloadURL()
    // );
    imgRootRef
      .listAll()
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          underDirs.push(`${clickedDir}/${folderRef.name}`);
        });
        res.items.forEach((itemRef) => {
          underItems.push(`${itemRef.name}`);
        });
        setStorageDirs([...underDirs]);
        setStorageDatas([...underItems]);
        setIsLoading(storageDatas.length === 0 && storageDirs.length === 0);
        console.log('ここは最初のthenの最後');
      })
      .then(() => {
        console.log('ここはthenでつないだ場所');
        underItems.forEach((elem, index) => {
          const imgRootRef = storageRef.child(`${clickedDir}/${elem}`);
          // Get the download URL
          imgRootRef
            .getDownloadURL()
            .then((url) => {
              // Insert url into an <img> tag to "download"
              underItemslUrls.push(url);
            })
            .then(() => {
              setStoragelUrls([...underItemslUrls]);
              // console.log('storagelUrls:', storagelUrls);
            });
        });
      })
      .catch((error) => {
        alert('handleDirSearch エラーが発生しました。');
        console.log('handleDirSearch error:', error);
      });
    // console.log('underItemslUrls:', underItemslUrls);
  };

  return (
    <>
      <Head>
        <title>ファイルアップ | Next.jsアプリ</title>
      </Head>
      <Heading1>ファイルアップロード</Heading1>
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
      {prog !== 0 ? (
        <Text>
          アップロード中・・・{`${prog}%`}
          <span
            className={`block h-5 bg-gray-200 rounded`}
            style={{ width: `${prog}%` }}></span>
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
    </>
  );
};

export default Index;
