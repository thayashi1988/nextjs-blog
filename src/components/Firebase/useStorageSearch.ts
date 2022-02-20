import { useCallback } from 'react';
import { storageRef } from '../../../firebase';
import { useStorageState } from '@/components/Firebase/useStorageState';
import { useMicromodal } from '@/components/Hooks/useMicromodal';

export const useStorageSearch = (
  storageDatas,
  setStorageDatas,
  storageDirs,
  setStorageDirs,
  storagelUrls,
  setStoragelUrls,
  oldDir,
  setOldDir,
  isLoading,
  setIsLoading,
  deleteFilePathStr,
  setDeleteFileNameStr,
  deleteFileNameStr,
  setDeleteFilePathStr,
  underItemslUrls
) => {
  const { open } = useMicromodal('sample-modal');
  // let underItemslUrls = [];

  // const {
  //   storageDatas,
  //   setStorageDatas,
  //   storageDirs,
  //   setStorageDirs,
  //   storagelUrls,
  //   setStoragelUrls,
  //   oldDir,
  //   setOldDir,
  //   isLoading,
  //   setIsLoading,
  // } = useStorageState();

  const handleDirSearch = useCallback((e: any) => {
    let clickedDir = '';

    setStorageDatas([]);
    setStorageDirs([]);
    setStoragelUrls([]);
    setIsLoading(true);

    clickedDir = e.target.value;
    setOldDir(`${clickedDir}`);

    // if (/\//.test(oldDir)) {
    //   setOldDir(`${clickedDir}`);
    // } else {
    //   setOldDir((prev) => `${prev}/${clickedDir}`);
    // }
    const dirRef = storageRef.child(`${clickedDir}`);
    const searchUnderItems = [];
    const searchUnderDirs = [];
    underItemslUrls = [];
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
        // console.log('handleDirSearchのファイル・ディレクトリ取得のthen');
      })
      .then(() => {
        // console.log('ここはそのthenをさらにthenでつないだ場所');
        getUrlOnebyOne(clickedDir, searchUnderItems);
      })
      .catch((error) => {
        alert('handleDirSearch エラーが発生しました。');
        console.log('handleDirSearch error:', error);
      });
    console.log('handleCreateFilePath clickedDir:', clickedDir);
  }, []);

  const getUrlOnebyOne = async (
    directory: string,
    fileNames: string[]
  ): Promise<void> => {
    for (let i = 0; i < fileNames.length; i++) {
      const imgRef = storageRef.child(`${directory}/${fileNames[i]}`);
      const imgUrl = imgRef.getDownloadURL();
      await imgUrl.then((url) => {
        underItemslUrls.push(url);
      });
      console.log('getUrlOnebyOne underItemslUrls:', underItemslUrls);
    }
    setStoragelUrls([...underItemslUrls]);
    console.log('useStorageSearch underItemslUrls:', underItemslUrls);
  };

  const handleCreateFilePath = (data: string): void => {
    console.log('handleCreateFilePath data:', data);
    console.log('handleCreateFilePath oldDir:', oldDir);
    open();
    setDeleteFileNameStr(data);
    setDeleteFilePathStr(`${oldDir}/${data}`);
    console.log('handleCreateFilePath ${oldDir}/${data}:', `${oldDir}/${data}`);
  };

  return {
    underItemslUrls,
    // storageDatas,
    // setStorageDatas,
    // storageDirs,
    // setStorageDirs,
    storagelUrls,
    // setStoragelUrls,
    // oldDir,
    // setOldDir,
    deleteFilePathStr,
    deleteFileNameStr,
    // isLoading,
    // setIsLoading,
    handleCreateFilePath,
    handleDirSearch,
  };
};
