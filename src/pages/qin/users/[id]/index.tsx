import type { NextPage } from 'next';
import React from 'react';
import { Btn } from '@/components/Button/Btn';
import { User } from '@/components/User';

const UserId: NextPage = () => {
  return (
    <>
      <User />
      <Btn link href="/qin" class="block mt-4">
        React講座へ戻る
      </Btn>
    </>
  );
};

export default UserId;
