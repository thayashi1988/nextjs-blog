import type { VFC } from 'react';
import React from 'react';

export const Loading: VFC = () => {
  return (
    <div className="animate-pulse mt-5">
      <div className="h-3 w-3/5 mb-3 bg-gray-400 rounded"></div>
      <div className="h-3 w-3/5 mb-3 bg-gray-400 rounded"></div>
      <div className="h-3 w-3/5 mb-3 bg-gray-400 rounded"></div>
    </div>
  );
};
