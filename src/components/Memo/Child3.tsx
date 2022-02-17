import React, { memo } from 'react';

const style = {
  height: '50px',
  backgroundColor: 'lightgray',
};

export const Child3: React.VFC = memo(() => {
  console.log('Child3 レンダリング:');

  return (
    <div style={style}>
      <p>Child3 レンダリング確認</p>
    </div>
  );
});
