import { useCallback } from 'react';
import { FBTest, storageRef } from '../../../firebase';
import { useStorageState } from '@/components/Firebase/useStorageState';

const fileMetadata = {
  contentType: 'image/*',
};

export const useStorageUp = (
  uploadedUrl,
  setUploadedUrl,
  progressBar,
  setProgressBar
) => {
  // const { uploadedUrl, setUploadedUrl, progressBar, setProgressBar } =
  //   useStorageState();

  const handleFileUp = useCallback(() => {
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
  }, []);
  return {
    // progressBar,
    // uploadedUrl,
    handleFileUp,
  };
};
