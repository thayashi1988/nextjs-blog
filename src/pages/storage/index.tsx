import type { NextPage } from 'next';
import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import { FBTest, storage, storageRef } from '../../../firebase';
import { Text } from '@/components/Text/Text';
import { Btn } from '@/components/Button/Btn';
import { NextImg } from '@/components/Img/Img';
import { Heading2 } from '@/components/Heading/Heading2';

const imgRef = storageRef.child('images/img_01.png');
// console.log('imgRef:', imgRef.fullPath);
// console.log('imgRef:', imgRef.name);
// console.log('imgRef:', imgRef.bucket);

const fileMetadata = {
  contentType: 'image/*',
};

export const Index: NextPage = (props) => {
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [storageDatas, setStorageDatas] = useState<any>([]);
  const [storageDir, setStorageDir] = useState<any>([]);
  const [oldDir, setOldDir] = useState<any>('');
  const [prog, setProg] = useState<number>(0);

  const handleFileUp = () => {
    const file =
      document.querySelector<HTMLInputElement>('input[type="file"]').files[0];
    const uploadTask = storageRef
      .child('images/' + file.name)
      .put(file, fileMetadata);
    console.log('uploadTask:', uploadTask);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        console.log('snapshot:', snapshot);
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setProg(progress);
        switch (snapshot.state) {
          case FBTest.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case FBTest.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            // setProg((oldProgress) => oldProgress + 1);
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            alert('エラーが発生しました。 unauthorized');
            break;
          case 'storage/canceled':
            alert('エラーが発生しました。canceled');
            break;
          case 'storage/unknown':
            alert('エラーが発生しました。unknown');
            break;
        }
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          setUploadedUrl(downloadURL);
          console.log('File available at', downloadURL);
          setProg(100);
        });
      }
    );
    console.log('uploadTask', uploadTask);
    console.log('file:', file);
  };

  const handleShowFiles = () => {
    setStorageDatas([]);
    setStorageDir([]);
    // const imgDirRef = storageRef.child('images');
    const imgRootRef = storageRef;
    const underItems = [];
    const underDirs = [];
    // Find all the prefixes and items.
    imgRootRef
      .listAll()
      .then((res) => {
        res.items.forEach((itemRef) => {
          // All the items under listRef.
          underItems.push(itemRef.name);
          console.log('itemRef.name:', itemRef.name);
        });
        setStorageDatas([...underItems]);
        res.prefixes.forEach((folderRef) => {
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
          underDirs.push(folderRef.name);
          console.log('folderRef.name:', folderRef.name);
        });
        setStorageDir([...underDirs]);
      })
      .catch((error) => {
        alert('handleShowFiles エラーが発生しました。');
        console.log('handleShowFiles error:', error);
      });
  };

  const handleDirSearch = (e) => {
    setStorageDatas(['']);
    setStorageDir(['']);
    console.log('storageDatas:', storageDatas);
    console.log('storageDir:', storageDir);

    const dir = e.target.value;
    console.log('dir:', dir);
    setOldDir(dir);
    console.log('oldDir:', oldDir);
    const imgRootRef = storageRef.child(`${dir}`);
    const underItems = [];
    const underDirs = [];
    imgRootRef
      .listAll()
      .then((res) => {
        console.log('res.items:', res.items);
        res.items.forEach((itemRef) => {
          console.log('itemRef.name:', itemRef.name);
          underItems.push(itemRef.name);
        });
        console.log('underItems:', underItems);
        setStorageDatas([...underItems]);

        res.prefixes.forEach((folderRef) => {
          underDirs.push(folderRef.name);
          console.log('folderRef.name:', folderRef.name);
        });
        console.log('underDirs:', underDirs);
        setStorageDir([...underDirs]);
      })
      .catch((error) => {
        alert('handleShowFiles エラーが発生しました。');
        console.log('handleShowFiles error:', error);
      });
  };

  return (
    <>
      <Head>
        <title>ファイルアップ | Next.jsアプリ</title>
      </Head>
      <Heading2>ファイルアップロード</Heading2>
      <div className="flex">
        <label htmlFor="">
          <input type="file" />
        </label>
        <Btn link={false} click={handleFileUp}>
          アップロード
        </Btn>
      </div>
      <Text>
        アップロード中・・・{`${prog}%`}
        <span
          className={`block w-[${prog}%] h-5 bg-gray-200 rounded`}
          style={{ width: `${prog}%` }}></span>
      </Text>
      <div className="text-center">
        <Text>アップロード画像</Text>
        <NextImg
          src={
            uploadedUrl ? uploadedUrl : 'https://via.placeholder.com/200/771796'
          }
          alt=""
          width="200"
          height="200"
          class="mb-8"
        />
      </div>
      <Heading2>Storage一覧表示</Heading2>
      <div className="text-left">
        <Btn link={false} click={handleShowFiles}>
          storage一覧表示
        </Btn>
        <Text>/{oldDir === '' ? 'root' : oldDir}</Text>
        {storageDatas.length !== 0
          ? storageDatas.map((data) => {
              return (
                <Text key={data} class="pl-3 mb-2">
                  {data}
                </Text>
              );
            })
          : null}
        {/* <Text>ディレクトリ一覧</Text> */}
        {storageDir.length !== 0
          ? storageDir.map((data) => {
              return (
                <div key={data} className="-mt-2">
                  <input
                    className="text-sm cursor-pointer sm:hover:opacity-80 text-blue-400 pl-3 inline-block mb-2"
                    type="button"
                    value={data}
                    onClick={handleDirSearch}
                  />
                </div>
              );
            })
          : null}
      </div>
    </>
  );
};

export default Index;
