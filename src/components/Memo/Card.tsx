import React, { memo } from 'react';
import { CardBtn } from '@/components/Memo/CardBtn';

const style = {
  width: '300px',
  height: '200px',
  borderRadius: '8px',
  backgroundColor: '#e9dbd0',
  display: 'flex',
  FlexDirection: 'column',
  justifyContnet: 'center',
  alignItems: 'center',
  margin: '8px',
};

export const Card: React.VFC = memo(() => {
  return (
    <div style={style}>
      <p>山田</p>
      <CardBtn />
    </div>
  );
});
