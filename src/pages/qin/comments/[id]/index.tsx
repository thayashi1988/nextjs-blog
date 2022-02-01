import type { NextPage } from 'next';
import React from 'react';
import { Btn } from '@/components/Button/Btn';
import { Comment } from '@/components/Qin/Comment';

const commentsId: NextPage = () => {
  return (
    <>
      <Comment />
      <Btn link href="/qin" class="block mt-4">
        React講座へ戻る
      </Btn>
    </>
  );
};

export default commentsId;
