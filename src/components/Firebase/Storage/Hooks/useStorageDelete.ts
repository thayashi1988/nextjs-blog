import { useCallback } from 'react';
import type { USEDELETESTATES } from '@/components/Firebase/Storage/Hooks/types';
import { storageRef } from '../../../../../firebase';
import { useMicromodal } from '@/components/Hooks/useMicromodal';

export const useStorageDelete = (props: USEDELETESTATES) => {
  const { close } = useMicromodal('sample-modal');
  const {
    deleteFilePathStr,
    storageDatas,
    setStorageDatas,
    storageUrls,
    setStorageUrls,
    deleteFileNameStr,
  } = props;

  const handleFileDelete = useCallback(() => {
    const deleteRef = storageRef.child(deleteFilePathStr);
    const deletedUnderItemslUrls = storageUrls.filter((prev: string) => {
      return prev.indexOf(deleteFileNameStr) === -1;
    });
    const deletedStorageDatas = storageDatas.filter((prev: string) => {
      return prev.indexOf(deleteFileNameStr) === -1;
    });
    setStorageDatas([...deletedStorageDatas]);
    setStorageUrls([...deletedUnderItemslUrls]);

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
  }, [deleteFilePathStr]);
  return {
    handleFileDelete,
  };
};
