import { useCallback } from 'react';
import type { USESEARCHSTATES } from '@/components/Firebase/Storage/Hooks/types';
import { storageRef } from '../../../../../firebase';
import { useMicromodal } from '@/components/Hooks/useMicromodal';

export const useStorageSearch = (props: USESEARCHSTATES) => {
  const { open } = useMicromodal('sample-modal');
  const {
    setStorageDatas,
    setStorageDirs,
    setStorageUrls,
    oldDir,
    setOldDir,
    setIsLoading,
    setDeleteFileNameStr,
    setDeleteFilePathStr,
  } = props;

  const underItemsUrls = [];
  let clickedDir = '';

  const handleDirSearch = useCallback((e: any) => {
    setStorageDatas([]);
    setStorageDirs([]);
    setStorageUrls([]);
    setIsLoading(true);

    clickedDir = e.target.value;
    setOldDir(`${clickedDir}`);

    const dirRef = storageRef.child(`${clickedDir}`);
    const searchUnderItems = [];
    const searchUnderDirs = [];
    underItemsUrls.length = 0;
    dirRef
      .listAll()
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          searchUnderDirs.push(`${clickedDir}/${folderRef.name}`);
        });
        res.items.forEach((itemRef) => {
          searchUnderItems.push(`${itemRef.name}`);
        });
        setStorageDirs([...searchUnderDirs]);
        setStorageDatas([...searchUnderItems]);
        // setIsLoading(storageDatas.length === 0 && storageDirs.length === 0);
        setIsLoading(
          searchUnderItems.length === 0 && searchUnderDirs.length === 0
        );
      })
      .then(() => {
        getUrlOnebyOne(clickedDir, searchUnderItems);
      })
      .catch((error) => {
        alert('handleDirSearch エラーが発生しました。');
        console.log('handleDirSearch error:', error);
      });
  }, []);

  const getUrlOnebyOne = async (
    directory: string,
    fileNames: string[]
  ): Promise<void> => {
    for (let i = 0; i < fileNames.length; i++) {
      const imgRef = storageRef.child(`${directory}/${fileNames[i]}`);
      const imgUrl = imgRef.getDownloadURL();
      await imgUrl.then((url: string) => {
        underItemsUrls.push(url);
      });
    }
    setStorageUrls([...underItemsUrls]);
  };

  const handleCreateFilePath = (data: string): void => {
    open();
    setDeleteFileNameStr(data);
    setDeleteFilePathStr(`${oldDir}/${data}`);
  };

  return {
    handleCreateFilePath,
    handleDirSearch,
  };
};
