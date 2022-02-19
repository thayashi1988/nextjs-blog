import React, { memo } from 'react';

export const Child3: React.VFC = memo(() => {
  console.log('Child3 レンダリング:');

  return (
    <div className="h-[50px] bg-yellow-100">
      <p>Child3 レンダリング確認</p>
    </div>
  );
});
