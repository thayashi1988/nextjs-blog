import { useEffect } from 'react';
import type { STATESPROPS } from '@/components/Firebase/Storage/Hooks/types';
import { storageRef } from '../../../../../firebase';

export const useStorageEffect = (props: STATESPROPS) => {
  const { setStorageDirs, setStorageDatas, setIsLoading } = props;
  useEffect(() => {
    // let unmounted = false;
    const firstLoad = function () {
      const underItems = [];
      const underDirs = [];
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
    };
    firstLoad();
    return () => firstLoad();
  }, []);
};
