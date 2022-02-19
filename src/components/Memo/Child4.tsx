import React, { memo } from 'react';

export const Child4: React.VFC = memo(() => {
  console.log('Child4 レンダリング:');

  return (
    <div className="h-[200px] bg-green-400 p-4">
      <p>Child4 レンダリング確認</p>
    </div>
  );
});
