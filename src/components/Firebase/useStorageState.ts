import React, { useState } from 'react';

type PROPS = {
  uploadedUrl?: string;
  setUploadedUrl?: React.Dispatch<React.SetStateAction<string>>;
  deleteFileNameStr?: string;
  setDeleteFileNameStr?: React.Dispatch<React.SetStateAction<string>>;
  deleteFilePathStr?: string;
  setDeleteFilePathStr?: React.Dispatch<React.SetStateAction<string>>;
  storageDatas?: string[];
  setStorageDatas?: React.Dispatch<React.SetStateAction<string[]>>;
  storageDirs?: string[];
  setStorageDirs?: React.Dispatch<React.SetStateAction<string[]>>;
  storagelUrls?: string[];
  setStoragelUrls?: React.Dispatch<React.SetStateAction<string[]>>;
  oldDir?: string;
  setOldDir?: React.Dispatch<React.SetStateAction<string>>;
  progressBar?: number;
  setProgressBar?: React.Dispatch<React.SetStateAction<number>>;
  isLoading?: boolean;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  clickDir?: string;
  setClickDir?: React.Dispatch<React.SetStateAction<string>>;
};

export const useStorageState = (): PROPS => {
  const [uploadedUrl, setUploadedUrl] = useState<string>('');
  const [deleteFileNameStr, setDeleteFileNameStr] = useState<string>('');
  const [deleteFilePathStr, setDeleteFilePathStr] = useState<string>('');
  const [storageDatas, setStorageDatas] = useState<string[]>([]);
  const [storageDirs, setStorageDirs] = useState<string[]>([]);
  const [storagelUrls, setStoragelUrls] = useState<string[]>([]);
  const [oldDir, setOldDir] = useState<string>('');
  const [clickDir, setClickDir] = useState<string>('');
  const [progressBar, setProgressBar] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // console.log('useStorageState storageDatas:', storageDatas);
  // console.log('useStorageState storageDirs:', storageDirs);
  // console.log('useStorageState storagelUrls:', storagelUrls);
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
    storagelUrls,
    setStoragelUrls,
    oldDir,
    setOldDir,
    isLoading,
    setIsLoading,
    clickDir,
    setClickDir,
  };
};
