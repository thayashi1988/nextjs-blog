import React, { memo, useCallback } from 'react';

export const LoadingPokemonCard: React.VFC = memo(() => {
  const LoopLoading = useCallback(() => {
    return (
      <div className="rounded-md shadow-md p-2 border border-gray-200">
        <div className="h-3 bg-gray-400 rounded"></div>
        <div className="h-3 w-4/6 bg-gray-400 rounded mt-4"></div>
        <div className="h-3 w-6/6 bg-gray-400 rounded mt-1"></div>
        <div className="h-32 bg-gray-400 rounded mt-4"></div>
      </div>
    );
  }, []);

  return (
    <div className="sm:max-w-5xl mx-auto">
      <div className="animate-pulse">
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 mb-3">
          <LoopLoading />
          <LoopLoading />
          <LoopLoading />
          <LoopLoading />
          <LoopLoading />
          <LoopLoading />
        </div>
      </div>
    </div>
  );
});
