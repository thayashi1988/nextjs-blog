import React from 'react';

export const LoadingBox: React.VFC = () => {
  return (
    <div
      className={`border border-gray-100 shadow-gray-300/50 rounded overflow-hidden shadow-lg sm:max-w-xl mx-auto p-4 sm:p-8`}>
      <div className="animate-pulse mt-5">
        <div className="h-3 w-3/6 mb-8 bg-gray-400 rounded text-center mx-auto"></div>
        <div className="h-3 w-4/6 mb-3 bg-gray-400 rounded"></div>
        <div className="h-3 w-4/6 mb-3 bg-gray-400 rounded"></div>
        <div className="h-3 w-4/6 mb-3 bg-gray-400 rounded"></div>
        <div className="h-3 w-4/6 bg-gray-400 rounded"></div>
      </div>
    </div>
  );
};
