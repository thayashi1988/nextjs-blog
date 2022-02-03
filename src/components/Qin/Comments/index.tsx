import React from 'react';
import { NextLink } from '@/components/Link/Link';
import { useComments } from '@/components/Hooks/useFetch';
import { LoadingText } from '@/components/Loading/LoadingText';
import { TextAlert } from '@/components/Text/TextAlert';

type APICOMMENTSPROPS = {
  id?: string;
  postId?: string;
  name?: string;
  email?: string;
};

export const Comments: React.VFC = () => {
  const { data, error, isLoading } = useComments();

  if (isLoading) {
    return <LoadingText />;
  }
  if (error) {
    return <TextAlert>{error.message}</TextAlert>;
  }
  return (
    <ul>
      {data.map((comment: APICOMMENTSPROPS) => {
        return (
          <li className="mb-4 text-sm" key={comment.id}>
            <NextLink href={`/qin/comments/${comment.id}`}>
              id：{comment.id}
              <span className="ml-2">{comment.email}</span>
            </NextLink>
          </li>
        );
      })}
    </ul>
  );
};
