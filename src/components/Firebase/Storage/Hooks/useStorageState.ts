import { useState } from 'react';
import type { STATESPROPS } from '@/components/Firebase/Storage/Hooks/types';

export const useStorageState = (): STATESPROPS => {
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [deleteFileNameStr, setDeleteFileNameStr] = useState('');
  const [deleteFilePathStr, setDeleteFilePathStr] = useState('');
  const [storageDatas, setStorageDatas] = useState([]);
  const [storageDirs, setStorageDirs] = useState([]);
  const [storageUrls, setStorageUrls] = useState([]);
  const [oldDir, setOldDir] = useState('');
  const [progressBar, setProgressBar] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  return {
    uploadedUrl,
    setUploadedUrl,
    progressBar,
    setProgressBar,
    deleteFileNameStr,
    setDeleteFileNameStr,
    deleteFilePathStr,
    setDeleteFilePathStr,
    storageDatas,
    setStorageDatas,
    storageDirs,
    setStorageDirs,
    storageUrls,
    setStorageUrls,
    oldDir,
    setOldDir,
    isLoading,
    setIsLoading,
  };
};
