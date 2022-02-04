import type { NextPage } from 'next';
import React, { useState, useCallback, useEffect } from 'react';
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

const allDirDatas = {
  root: {
    path: '/',
  },
};

export const Index: NextPage = (props) => {
  const [uploadedUrl, setUploadedUrl] = useState<string>('');
  const [storageDatas, setStorageDatas] = useState<string[]>([]);
  const [storageDir, setStorageDir] = useState<string[]>([]);
  const [allDir, setAllDir] = useState<any>({
    root: {
      path: '/',
    },
  });
  const [oldDir, setOldDir] = useState<string>('');
  const [prog, setProg] = useState<number>(0);

  const imgRootRef = storageRef;
  const underItems = [];
  const underDirs = [];
  useEffect(() => {
    // const kkk = () => {
    imgRootRef
      .listAll()
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          underDirs.push(folderRef.name);
          console.log('folderRef.name:', folderRef.name);
          allDirDatas.root[folderRef.name] = { files: '' };
          allDirDatas.root[folderRef.name].path = `${folderRef.name}`;
          res.items.forEach((itemRef) => {
            underItems.push(itemRef.name);
            console.log('itemRef.name:', itemRef.name);
          });
          allDirDatas.root[folderRef.name].files = [underItems];
        });
        console.log('allDirDatas:', allDirDatas);
        setStorageDir([...underDirs]);
        setStorageDatas([...underItems]);
      })
      .catch((error) => {
        alert('handleShowFiles エラーが発生しました。');
        console.log('handleShowFiles error:', error);
      });
    // };
    // return () => kkk();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    setOldDir('');
    // const imgDirRef = storageRef.child('images');
    const imgRootRef = storageRef;
    const underItems = [];
    const underDirs = [];
    // Find all the prefixes and items.
    imgRootRef
      .listAll()
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          underDirs.push(folderRef.name);
          console.log('folderRef.name:', folderRef.name);
          allDirDatas.root[folderRef.name] = { files: '' };
          allDirDatas.root[folderRef.name].path = `${folderRef.name}`;
          res.items.forEach((itemRef) => {
            underItems.push(itemRef.name);
            console.log('itemRef.name:', itemRef.name);
          });
          // allDirDatas.root[folderRef.name].files = [underItems];
        });
        console.log('allDirDatas:', allDirDatas);
        setStorageDir([...underDirs]);
        setStorageDatas([...underItems]);

        // res.items.forEach((itemRef) => {
        //   underItems.push(itemRef.name);
        //   console.log('itemRef.name:', itemRef.name);
        // });
        // setStorageDatas([...underItems]);
        // allDirDatas.root[folderRef.name] = [underItems];
      })
      .catch((error) => {
        alert('handleShowFiles エラーが発生しました。');
        console.log('handleShowFiles error:', error);
      });
  };

  const handleDirSearch = (e) => {
    setStorageDatas(['']);
    setStorageDir(['']);

    const clickedDir = e.target.value;
    console.log('clickedDir:', clickedDir);
    if (/\//.test(oldDir)) {
      setOldDir(`${clickedDir}`);
    } else {
      setOldDir((prev) => `${prev}/${clickedDir}`);
    }
    // const hhhh = Object.keys(allDirDatas.root[oldDir]);
    // const hhhh = Object.entries(allDirDatas).find(([key, index]) => {
    //   console.log('key:', key);
    //   // key[clickedDir] === clickedDir
    // });
    // console.log('hhhh:', hhhh);
    console.log('oldDir:', oldDir);
    const jjjj = `${oldDir}/${clickedDir}`;
    console.log('jjjj:', jjjj);
    const imgRootRef = storageRef.child(`${clickedDir}`);
    const underItems = [];
    const underDirs = [];
    imgRootRef
      .listAll()
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          underDirs.push(`${clickedDir}/${folderRef.name}`);
          // console.log('handleDirSearch folderRef.name:', folderRef.name);
          // allDirDatas.root[clickedDir][folderRef.name] = { files: '' };
          // allDirDatas.root[clickedDir][
          //   folderRef.name
          // ].path = `${clickedDir}/${folderRef.name}`;
        });
        res.items.forEach((itemRef) => {
          // console.log('handleDirSearch itemRef.name:', itemRef.name);
          underItems.push(`${itemRef.name}`);
        });
        // console.log(
        //   'allDirDatas.root[clickedDir]:',
        //   allDirDatas.root[clickedDir]
        // );
        // allDirDatas.root[clickedDir].files = [...underItems];
        // console.log('underDirs:', underDirs);
        setStorageDir([...underDirs]);
        setStorageDatas([...underItems]);
        console.log('storageDir:', storageDir);

        // res.items.forEach((itemRef) => {
        //   console.log('handleDirSearch itemRef.name:', itemRef.name);
        //   underItems.push(itemRef.name);
        // });
        // allDirDatas.root[clickedDir] = [...underItems];
        // console.log('underItems:', underItems);
      })
      .catch((error) => {
        alert('handleShowFiles エラーが発生しました。');
        console.log('handleShowFiles error:', error);
      });

    // console.log('allDirDatas:', allDirDatas);
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
          className={`block h-5 bg-gray-200 rounded`}
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
      <Heading2>Storage表示</Heading2>
      <div className="text-left">
        {/* <Btn link={false} click={handleShowFiles}>
          storage表示
        </Btn> */}
        <Text>
          現在のディレクトリ
          <br />
          {`https://firebasestorage.googleapis.com/v0/b/udemy-todo-f0672.appspot.com/o/${oldDir}`}
          {/* {oldDir === ''
            ? 'https://firebasestorage.googleapis.com/v0/b/udemy-todo-f0672.appspot.com/o/'
            : `https://firebasestorage.googleapis.com/v0/b/udemy-todo-f0672.appspot.com/o/${oldDir}`} */}
        </Text>
        {storageDatas.length !== 0
          ? storageDatas.map((data) => {
              return (
                <Text key={data} class="pl-3 mb-2">
                  {data}
                </Text>
              );
            })
          : null}
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
                  <span className="text-xs">ディレクトリ</span>
                </div>
              );
            })
          : null}
      </div>
    </>
  );
};

export default Index;
