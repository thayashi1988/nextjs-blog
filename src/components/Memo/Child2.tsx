import React, { memo } from 'react';

export const Child2: React.VFC = memo(() => {
  console.log('Child2 レンダリング:');

  return (
    <div className="h-[50px] bg-blue-400">
      <p>Child2 レンダリング確認</p>
    </div>
  );
});
