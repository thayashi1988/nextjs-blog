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
};

export const useStorageState = (): PROPS => {
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [deleteFileNameStr, setDeleteFileNameStr] = useState('');
  const [deleteFilePathStr, setDeleteFilePathStr] = useState('');
  const [storageDatas, setStorageDatas] = useState([]);
  const [storageDirs, setStorageDirs] = useState([]);
  const [storagelUrls, setStoragelUrls] = useState([]);
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
    storagelUrls,
    setStoragelUrls,
    oldDir,
    setOldDir,
    isLoading,
    setIsLoading,
  };
};
