import { useCallback } from 'react';
import { storageRef } from '../../../firebase';
import { useMicromodal } from '@/components/Hooks/useMicromodal';

export const useStorageDelete = (
  deleteFilePathStr: string,
  storageDatas: string[],
  setStorageDatas: React.Dispatch<React.SetStateAction<string[]>>,
  setStoragelUrls: React.Dispatch<React.SetStateAction<string[]>>,
  deleteFileNameStr: string,
  currentStoragelUrls: string[]
) => {
  const { close } = useMicromodal('sample-modal');

  const handleFileDelete = useCallback(() => {
    const deleteRef = storageRef.child(deleteFilePathStr);
    const deletedUnderItemslUrls = currentStoragelUrls.filter(
      (prev: string) => {
        return prev.indexOf(deleteFileNameStr) === -1;
      }
    );
    const deletedStorageDatas = storageDatas.filter((prev: string) => {
      return prev.indexOf(deleteFileNameStr) === -1;
    });
    currentStoragelUrls = [...deletedUnderItemslUrls];
    setStorageDatas([...deletedStorageDatas]);
    setStoragelUrls([...deletedUnderItemslUrls]);

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
  }, [deleteFilePathStr, currentStoragelUrls]);
  return {
    handleFileDelete,
  };
};
