import React from 'react';

export const LoadingTop: React.VFC = () => {
  return (
    <div className="border border-gray-100 shadow rounded-md p-4 w-full">
      <div className="animate-pulse">
        <div className="h-10 w-5/12 mb-8 bg-gray-400 rounded"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="h-8 bg-gray-400 rounded"></div>
          <div className="h-8 bg-gray-400 rounded"></div>
          <div className="h-8 bg-gray-400 rounded"></div>
          <div className="h-8 bg-gray-400 rounded"></div>
          <div className="h-8 bg-gray-400 rounded"></div>
          <div className="h-8 bg-gray-400 rounded"></div>
        </div>
      </div>
    </div>
  );
};
