import type { VFC } from 'react';
import React from 'react';

export const LoadingFirebase: VFC = () => {
  return (
    <>
      <div className="border border-gray-100 shadow rounded-md p-4 w-full mb-10">
        <div className="animate-pulse">
          <div className="h-5 bg-gray-200 rounded w-3/12 mb-3"></div>
          <div className="flex flex-col sm:flex-row items-center">
            <div className="h-5 bg-gray-200 rounded w-full sm:w-5/12 sm:mr-3 mb-3 sm:mb-0"></div>
            <div className="h-5 bg-gray-200 rounded w-full sm:w-2/12"></div>
          </div>
        </div>
      </div>
      <div className="border border-gray-100 shadow rounded-md p-4 w-full">
        <div className="animate-pulse flex flex-col sm:flex-row justify-between items-center space-x-0 sm:space-x-4">
          <div className="h-full w-full sm:w-3/6 md:w-7/12 mb-5 sm:mb-0">
            <div className="h-5 bg-gray-200 rounded w-4/12 mb-3"></div>
            <div className="h-5 bg-gray-200 rounded w-3/12 mb-3"></div>
            <div className="h-5 bg-gray-200 rounded w-5/12"></div>
          </div>
          <div className="h-full w-full sm:w-3/6 md:w-5/12">
            <div className="h-5 bg-gray-200 rounded w-full"></div>
            <div className="flex justify-between mt-2 space-x-0 sm:space-x-4">
              <div className="h-5 bg-gray-200 rounded w-6/12 mr-2"></div>
              <div className="h-5 bg-gray-200 rounded w-6/12 ml-2"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
