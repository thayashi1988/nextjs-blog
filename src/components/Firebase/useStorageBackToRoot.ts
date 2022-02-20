import { useCallback } from 'react';
import type { USEBACKTOROOTSTATES } from '@/components/Firebase/types';
import { storageRef } from '../../../firebase';

export const useStorageBackToRoot = (props: USEBACKTOROOTSTATES) => {
  const {
    storageDatas,
    setStorageDatas,
    storageDirs,
    setStorageDirs,
    setOldDir,
    isLoading,
    setIsLoading,
  } = props;

  const handleDirBackToTop = useCallback(() => {
    setStorageDatas([]);
    setStorageDirs([]);
    setIsLoading(true);
    setOldDir('');
    const backToTopItems = [];
    const backToTopDirs = [];

    storageRef
      .listAll()
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          backToTopDirs.push(folderRef.name);
          res.items.forEach((itemRef) => {
            backToTopItems.push(itemRef.name);
          });
        });
        setStorageDirs([...backToTopDirs]);
        setStorageDatas([...backToTopItems]);
        setIsLoading(backToTopItems.length === 0 && backToTopDirs.length === 0);
      })
      .catch((error) => {
        alert('handleDirBackToTop エラーが発生しました。');
        console.log('handleDirBackToTop error:', error);
      });
  }, [storageDatas, storageDirs, isLoading]);

  return {
    handleDirBackToTop,
  };
};
