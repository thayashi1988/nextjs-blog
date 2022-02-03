import React from 'react';

export const LoadingText: React.VFC = () => {
  return (
    <div className="border border-gray-100 shadow rounded-md p-4 w-full">
      <div className="animate-pulse mt-5">
        <div className="h-3 w-6/6 mb-3 bg-gray-400 rounded"></div>
        <div className="h-3 w-2/6 mb-6 bg-gray-400 rounded"></div>
        <div className="h-3 w-6/6 mb-3 bg-gray-400 rounded"></div>
        <div className="h-3 w-2/6 mb-3 bg-gray-400 rounded"></div>
      </div>
    </div>
  );
};
