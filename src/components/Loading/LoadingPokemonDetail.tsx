import React, { memo } from 'react';

export const LoadingPokemonDetail: React.VFC = memo(() => {
  return (
    <div className="sm:max-w-5xl mx-auto rounded-md shadow-md p-2 border border-gray-200 mb-5">
      <div className="animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="">
            <div className="h-32 bg-gray-400 rounded"></div>
          </div>
          <div className="">
            <div className="grid grid-cols-2 gap-2">
              <div className="h-3 bg-gray-400 rounded"></div>
              <div className="h-3 bg-gray-400 rounded"></div>
              <div className="h-3 bg-gray-400 rounded"></div>
              <div className="h-3 bg-gray-400 rounded"></div>
              <div className="h-3 bg-gray-400 rounded"></div>
              <div className="h-3 bg-gray-400 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
