import type { VFC } from 'react';
import React from 'react';

type PROPS = {
  value: string;
  class?: string;
  name: string;
  change: React.ChangeEventHandler<HTMLInputElement>;
};

export const FirebaseInput: VFC<PROPS> = (props) => {
  return (
    <input
      className={`border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-xs p-2 ${props.class}`}
      name={props.name}
      value={props.value}
      onChange={props.change}
    />
  );
};
