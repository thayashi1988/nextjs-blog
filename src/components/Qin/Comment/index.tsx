import React from 'react';
import { useComment } from '@/components/Hooks/useComment';
import { LoadingBox } from '@/components/Loading/LoadingBox';
import { TextAlert } from '@/components/Text/TextAlert';
import { Text } from '@/components/Text/Text';
import { Heading2 } from '@/components/Heading/Heading2';
import { ResultCard } from '@/components/Qin/ResultCard/ResultCard';
import { NextImg } from '@/components/Img/Img';

type APIPHOTOPROPS = {
  albumId?: string;
  id?: string;
  title?: string;
  url?: string;
  thumbnailUrl?: string;
};

export const Comment: React.VFC = () => {
  const { photo, error, isLoading } = useComment();

  if (isLoading) {
    return <LoadingBox />;
  }
  if (error) {
    return <TextAlert>{error.message}</TextAlert>;
  }

  return (
    <>
      {photo.map((data: APIPHOTOPROPS) => {
        return (
          <ResultCard key={data?.id}>
            <Heading2 class="text-center">id：{data?.id}</Heading2>
            <Text class="text-lg">albumId：{data?.albumId}</Text>
            <Text class="text-lg">title：{data?.title}</Text>
            <Text class="text-lg">thumbnai：</Text>
            <NextImg
              src={data?.thumbnailUrl}
              alt={data?.title}
              width="150"
              height="150"
              class="text-center"
            />
          </ResultCard>
        );
      })}
    </>
  );
};
