import React, { memo } from 'react';

const style = {
  height: '200px',
  backgroundColor: 'green',
  padding: '8px',
};

export const Child4: React.VFC = memo(() => {
  console.log('Child4 レンダリング:');

  return (
    <div style={style}>
      <p>Child4 レンダリング確認</p>
    </div>
  );
});
