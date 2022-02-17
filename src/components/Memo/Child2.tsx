import React, { memo } from 'react';

const style = {
  height: '50px',
  backgroundColor: 'lightblue',
};

export const Child2: React.VFC = memo(() => {
  console.log('Child2 レンダリング:');

  return (
    <div style={style}>
      <p>Child2 レンダリング確認</p>
    </div>
  );
});
