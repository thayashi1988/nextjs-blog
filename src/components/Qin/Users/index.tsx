import type { VFC } from 'react';
import React from 'react';
import { NextLink } from '@/components/Link/Link';
import { useUsers } from '@/components/Hooks/useFetch';
import { Loading } from '@/components/Loading/Loading';

type apiUsersProps = {
  id?: string;
  name?: string;
};

export const Users: VFC = () => {
  const { data, error, isLoading } = useUsers();

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <ul className="my-5">
      {data.map((user: apiUsersProps) => {
        return (
          <li className="mb-4 text-sm" key={user.id}>
            <NextLink
              href={`/qin/users/${user.id}`}
              class="text-black-600 hover:opacity-80">
              {user.id}&nbsp;
              {user.name}
            </NextLink>
          </li>
        );
      })}
    </ul>
  );
};
