import type { VFC } from 'react';
import Head from 'next/head';
import React from 'react';
import { useComment } from '@/components/Hooks/useComment';
import { useRouter } from 'next/router';
import { Loading } from '@/components/Loading/Loading';
import { TextAlert } from '@/components/Text/TextAlert';

type apiCommentProps = {
  id?: string;
  email?: string;
  body?: string;
};

export const Comment: VFC = () => {
  const router = useRouter();
  const { comment, error, isLoading } = useComment();

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <TextAlert>{error.message}</TextAlert>;
  }

  return (
    <>
      <Head>
        <title>Comments 下層ページ</title>
      </Head>
      <ul>
        <h1 className="text-2xl font-bold text-center mb-6">
          postId {router.query.id}
        </h1>
        {comment.map((commentItem: apiCommentProps) => {
          return (
            <li key={commentItem.id} className="mb-5">
              <div className="text-left">
                <h1 className="text-xl font-bold">id：{commentItem?.id}</h1>
                <p className="mt-3">email：{commentItem?.email}</p>
                <p className="mt-3">body：{commentItem?.body}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};
