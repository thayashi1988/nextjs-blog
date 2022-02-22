import React from 'react';

type STATESPROPS = {
  uploadedUrl?: string;
  setUploadedUrl?: React.Dispatch<React.SetStateAction<string>>;
  makeDir?: string;
  setMakeDir?: React.Dispatch<React.SetStateAction<string>>;
  deleteFileNameStr?: string;
  setDeleteFileNameStr?: React.Dispatch<React.SetStateAction<string>>;
  deleteFilePathStr?: string;
  setDeleteFilePathStr?: React.Dispatch<React.SetStateAction<string>>;
  storageDatas?: string[];
  setStorageDatas?: React.Dispatch<React.SetStateAction<string[]>>;
  storageDirs?: string[];
  setStorageDirs?: React.Dispatch<React.SetStateAction<string[]>>;
  storageUrls?: string[];
  setStorageUrls?: React.Dispatch<React.SetStateAction<string[]>>;
  oldDir?: string;
  setOldDir?: React.Dispatch<React.SetStateAction<string>>;
  progressBar?: number;
  setProgressBar?: React.Dispatch<React.SetStateAction<number>>;
  isLoading?: boolean;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
};

type ALLSTATES = {
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
  storageUrls?: string[];
  setStorageUrls?: React.Dispatch<React.SetStateAction<string[]>>;
  oldDir?: string;
  setOldDir?: React.Dispatch<React.SetStateAction<string>>;
  progressBar?: number;
  setProgressBar?: React.Dispatch<React.SetStateAction<number>>;
  isLoading?: boolean;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
};

type USEUPLOADSTATES = {
  setUploadedUrl?: React.Dispatch<React.SetStateAction<string>>;
  setProgressBar?: React.Dispatch<React.SetStateAction<number>>;
};

type USEEFFECTSTATES = {
  setStorageDirs?: React.Dispatch<React.SetStateAction<string[]>>;
  setStorageDatas?: React.Dispatch<React.SetStateAction<string[]>>;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
};

type USEDELETESTATES = {
  deleteFilePathStr?: string;
  storageDatas?: string[];
  setStorageDatas?: React.Dispatch<React.SetStateAction<string[]>>;
  storageUrls?: string[];
  setStorageUrls?: React.Dispatch<React.SetStateAction<string[]>>;
  deleteFileNameStr?: string;
};

type USEBACKTOROOTSTATES = {
  storageDatas?: string[];
  setStorageDatas?: React.Dispatch<React.SetStateAction<string[]>>;
  storageDirs?: string[];
  setStorageDirs?: React.Dispatch<React.SetStateAction<string[]>>;
  setOldDir?: React.Dispatch<React.SetStateAction<string>>;
  isLoading?: boolean;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
};

type USESEARCHSTATES = {
  setStorageDatas?: React.Dispatch<React.SetStateAction<string[]>>;
  setStorageDirs?: React.Dispatch<React.SetStateAction<string[]>>;
  storageUrls?: string[];
  setStorageUrls?: React.Dispatch<React.SetStateAction<string[]>>;
  oldDir?: string;
  setOldDir?: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteFileNameStr?: React.Dispatch<React.SetStateAction<string>>;
  setDeleteFilePathStr?: React.Dispatch<React.SetStateAction<string>>;
};

/**
 * @package
 */
export type {
  STATESPROPS,
  ALLSTATES,
  USEUPLOADSTATES,
  USEEFFECTSTATES,
  USEDELETESTATES,
  USEBACKTOROOTSTATES,
  USESEARCHSTATES,
};
