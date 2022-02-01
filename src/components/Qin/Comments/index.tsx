import type { VFC } from 'react';
import React from 'react';
import { NextLink } from '@/components/Link/Link';
import { useComments } from '@/components/Hooks/useFetch';

type apiCommentsProps = {
  id?: string;
  postId?: string;
  name?: string;
  email?: string;
};

export const Comments: VFC = () => {
  const { data, error, isLoading } = useComments();

  if (isLoading) {
    return (
      <div className="animate-pulse mt-5">
        <div className="h-3 w-3/5 mb-3 bg-gray-400 rounded"></div>
        <div className="h-3 w-3/5 mb-3 bg-gray-400 rounded"></div>
        <div className="h-3 w-3/5 mb-3 bg-gray-400 rounded"></div>
      </div>
    );
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <ul className="my-5">
      {data.map((comment: apiCommentsProps) => {
        return (
          <li className="mb-4 text-sm" key={comment.id}>
            <NextLink
              href={`/qin/comments/${comment.postId}`}
              class="text-black-600 hover:opacity-80">
              postId：{comment.postId}
              <br />
              {comment.name}
              <br />
              {comment.email}
            </NextLink>
          </li>
        );
      })}
    </ul>
  );
};
