import type { VFC } from 'react';
import React from 'react';

export const LoadingFirebase: VFC = () => {
  return (
    <div className="border border-gray-100 shadow rounded-md p-4 w-full">
      <div className="animate-pulse flex justify-between items-center space-x-4">
        <div className="h-5 bg-gray-200 rounded w-3/12"></div>
        <div className="w-3/12 h-full">
          <div className="h-5 bg-gray-200 rounded w-full"></div>
          <div className="flex justify-between mt-2 space-x-4">
            <div className="h-5 bg-gray-200 rounded w-6/12"></div>
            <div className="h-5 bg-gray-200 rounded w-6/12"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
