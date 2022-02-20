import { useCallback } from 'react';
import { storageRef } from '../../../firebase';
import { useStorageState } from '@/components/Firebase/useStorageState';

export const useFirebaseBackToRoot = (
  storageDatas,
  setStorageDatas,
  storageDirs,
  setStorageDirs,
  oldDir,
  setOldDir,
  isLoading,
  setIsLoading
) => {
  // const {
  //   storageDatas,
  //   setStorageDatas,
  //   storageDirs,
  //   setStorageDirs,
  //   oldDir,
  //   setOldDir,
  //   isLoading,
  //   setIsLoading,
  // } = useStorageState();

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
        // console.log('useFirebaseBackToRoot storageDirs:', storageDirs);
        // console.log('useFirebaseBackToRoot storageDatas:', storageDatas);
      })
      .catch((error) => {
        alert('handleDirBackToTop エラーが発生しました。');
        console.log('handleDirBackToTop error:', error);
      });
  }, [storageDatas, storageDirs, isLoading]);

  return {
    // storageDatas,
    // setStorageDatas,
    // storageDirs,
    // setStorageDirs,
    // oldDir,
    // setOldDir,
    // isLoading,
    // setIsLoading,
    handleDirBackToTop,
  };
};
