import React, { memo, useContext } from 'react';
import { AdminFlagContext } from '@/components/Providers/AdminFlagProvoder';

type PROPS = {
  isAdmin?: Boolean;
};

export const CardBtn: React.VFC<PROPS> = memo(() => {
  const { isAdmin } = useContext(AdminFlagContext);
  return (
    <div>
      <button
        type="button"
        disabled={!isAdmin}
        className="w-[100px] rounded-md p-4 bg-orange-200">
        編集
      </button>
    </div>
  );
});
