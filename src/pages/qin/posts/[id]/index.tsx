import type { NextPage } from 'next';
import React from 'react';
import { Btn } from '@/components/Button/Btn';
import { Post } from '@/components/Post';

const PostId: NextPage = () => {
  return (
    <>
      <Post />
      <Btn link href="/qin" class="block mt-4">
        React講座へ戻る
      </Btn>
    </>
  );
};

export default PostId;
