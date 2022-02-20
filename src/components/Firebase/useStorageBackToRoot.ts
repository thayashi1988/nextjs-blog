import { useCallback } from 'react';
import { storageRef } from '../../../firebase';

type ARG = {
  storageDatas?: string[];
  setStorageDatas?: React.Dispatch<React.SetStateAction<string[]>>;
  storageDirs?: string[];
  setStorageDirs?: React.Dispatch<React.SetStateAction<string[]>>;
  setOldDir?: React.Dispatch<React.SetStateAction<string>>;
  isLoading?: boolean;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useStorageBackToRoot = (props: ARG) => {
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
