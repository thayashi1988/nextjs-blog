import React from 'react';
import { NextLink } from '@/components/Link/Link';
import { useUsers } from '@/components/Hooks/useFetch';
import { LoadingText } from '@/components/Loading/LoadingText';
import { TextAlert } from '@/components/Text/TextAlert';

type APIUSERSPROPS = {
  id?: string;
  name?: string;
};

export const Users: React.VFC = () => {
  const { data, error, isLoading } = useUsers();

  if (isLoading) {
    return <LoadingText />;
  }
  if (error) {
    return <TextAlert>{error.message}</TextAlert>;
  }
  return (
    <ul>
      {data.map((user: APIUSERSPROPS) => {
        return (
          <li className="mb-4 text-sm" key={user.id}>
            <NextLink href={`/qin/users/${user.id}`}>
              {user.id}&nbsp;
              {user.name}
            </NextLink>
          </li>
        );
      })}
    </ul>
  );
};
