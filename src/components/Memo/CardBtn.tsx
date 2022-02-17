import React, { memo, useContext } from 'react';
import { AdminFlagContext } from '@/components/Providers/AdminFlagProvoder';

const style = {
  width: '100px',
  borderRadius: '8px',
  padding: '8px',
  backgroundColor: 'green',
};

type PROPS = {
  isAdmin?: Boolean;
};

export const CardBtn: React.VFC<PROPS> = memo(() => {
  const isAdmin = useContext(AdminFlagContext);
  console.log('isAdmin:', isAdmin);
  return (
    <div>
      <button style={style} type="button" disabled={!isAdmin}>
        編集
      </button>
    </div>
  );
});
