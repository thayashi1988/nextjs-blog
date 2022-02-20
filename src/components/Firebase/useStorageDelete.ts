import { useCallback } from 'react';
import { storageRef } from '../../../firebase';
import { useMicromodal } from '@/components/Hooks/useMicromodal';

type ARG = {
  deleteFilePathStr?: string;
  storageDatas?: string[];
  setStorageDatas?: React.Dispatch<React.SetStateAction<string[]>>;
  storagelUrls?: string[];
  setStoragelUrls?: React.Dispatch<React.SetStateAction<string[]>>;
  deleteFileNameStr?: string;
};

export const useStorageDelete = (props: ARG) => {
  const { close } = useMicromodal('sample-modal');
  const {
    deleteFilePathStr,
    storageDatas,
    setStorageDatas,
    storagelUrls,
    setStoragelUrls,
    deleteFileNameStr,
  } = props;

  const handleFileDelete = useCallback(() => {
    const deleteRef = storageRef.child(deleteFilePathStr);
    const deletedUnderItemslUrls = storagelUrls.filter((prev: string) => {
      return prev.indexOf(deleteFileNameStr) === -1;
    });
    const deletedStorageDatas = storageDatas.filter((prev: string) => {
      return prev.indexOf(deleteFileNameStr) === -1;
    });
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
  }, [deleteFilePathStr, storagelUrls]);
  return {
    handleFileDelete,
  };
};
