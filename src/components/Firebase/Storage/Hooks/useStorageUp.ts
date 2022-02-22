import { useCallback } from 'react';
import type { STATESPROPS } from '@/components/Firebase/Storage/Hooks/types';
import { FBTest, storageRef } from '../../../../../firebase';

const fileMetadata = {
  contentType: 'image/*',
};

export const useStorageUp = (props: STATESPROPS) => {
  const {
    setUploadedUrl,
    makeDir,
    setMakeDir,
    storageDatas,
    setStorageDatas,
    storageUrls,
    oldDir,
    setStorageUrls,
    setProgressBar,
  } = props;

  const handleMakeDir = useCallback((e) => {
    setMakeDir(e.target.value);
    console.log('handleMakeDir e.target.value:', e.target.value);
  }, []);

  const handleFileUp = useCallback(() => {
    let makeDirName = '';
    let fileUpDir = '';
    const text = document.querySelector<HTMLInputElement>(
      'input.next-input-text'
    );
    const file = document.querySelector<HTMLInputElement>(
      'input.next-input-file'
    ).files[0];
    if (!file) {
      alert('アップロードファイルを選択してください。');
      return;
    }
    if (oldDir === '') {
      alert('rootディレクトリに画像はアップロードできません。');
      return;
    }
    if (makeDir !== '') {
      makeDirName = makeDir;
      fileUpDir = `${oldDir}/${makeDirName}/${file.name}`;
    } else {
      fileUpDir = `${oldDir}/${file.name}`;
    }

    setProgressBar(1);
    const uploadTask = storageRef.child(fileUpDir).put(file, fileMetadata);

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
          if (makeDir === '') {
            setStorageDatas([...storageDatas, file.name]);
            setStorageUrls([...storageUrls, downloadURL]);
          }
          setTimeout(() => {
            setProgressBar(0);
          }, 1000);
          setMakeDir('');
          text.value = '';
        });
      }
    );
  }, [storageDatas, storageUrls, makeDir]);

  return {
    handleFileUp,
    handleMakeDir,
  };
};
