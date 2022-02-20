import { useEffect } from 'react';
import { storageRef } from '../../../firebase';

export const useStorageEffect = (
  setStorageDirs: React.Dispatch<React.SetStateAction<string[]>>,
  setStorageDatas: React.Dispatch<React.SetStateAction<string[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  useEffect(() => {
    const underItems = [];
    const underDirs = [];
    let unmounted = false;
    storageRef
      .listAll()
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          underDirs.push(folderRef.name);
          res.items.forEach((itemRef) => {
            underItems.push(itemRef.name);
          });
        });
        setStorageDirs([...underDirs]);
        setStorageDatas([...underItems]);
        setIsLoading(underItems.length === 0 && underDirs.length === 0);
      })
      .catch((error) => {
        alert('useEffect エラーが発生しました。');
        console.log('useEffect error:', error);
      });
    return () => {
      unmounted = true;
    };
  }, []);
};
