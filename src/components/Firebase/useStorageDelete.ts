import { useCallback } from 'react';
import { storageRef } from '../../../firebase';
import { useStorageState } from '@/components/Firebase/useStorageState';
import { useMicromodal } from '@/components/Hooks/useMicromodal';

// type PROPS = {
//   underItemslUrls?: any;
// };

export const useStorageDelete = (
  deleteFilePathStr,
  setDeleteFilePathStr,
  storageDatas,
  setStorageDatas,
  deleteFileNameStr,
  setDeleteFileNameStr,
  underItemslUrls
) => {
  const { close } = useMicromodal('sample-modal');
  // const {
  //   deleteFilePathStr,
  //   setDeleteFilePathStr,
  //   storageDatas,
  //   setStorageDatas,
  //   deleteFileNameStr,
  //   setDeleteFileNameStr,
  // } = useStorageState();

  // let { underItemslUrls } = props;
  // let underItemslUrls = [];

  const handleFileDelete = useCallback(() => {
    console.log('useStorageDelete deleteFilePathStr:', deleteFilePathStr);
    console.log('useStorageDelete underItemslUrls:', underItemslUrls);
    const deleteRef = storageRef.child(deleteFilePathStr);
    const deletedUnderItemslUrls = underItemslUrls.filter((prev: string) => {
      return prev.indexOf(deleteFileNameStr) === -1;
    });
    const deletedStorageDatas = storageDatas.filter((prev: string) => {
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
  }, [deleteFilePathStr, underItemslUrls]);
  return {
    // deleteFilePathStr,
    // setDeleteFilePathStr,
    // storageDatas,
    // setStorageDatas,
    // deleteFileNameStr,
    // setDeleteFileNameStr,
    handleFileDelete,
  };
};
