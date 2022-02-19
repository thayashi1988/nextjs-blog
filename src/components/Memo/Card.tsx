import React, { memo } from 'react';
import { CardBtn } from '@/components/Memo/CardBtn';

type PROPS = {
  isAdmin?: Boolean;
};

export const Card: React.VFC<PROPS> = memo(() => {
  return (
    <div className="w-[300px] h-[200px] rounded-md bg-cyan-500 flex flex-col justify-center items-center mb-4">
      <p>山田</p>
      <CardBtn />
    </div>
  );
});
