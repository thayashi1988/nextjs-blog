import type { VFC } from 'react';
import React from 'react';

type PROPS = {
  class?: string;
  children: React.ReactNode;
};

export const TextAlert: VFC<PROPS> = (props) => {
  return (
    <p className={`text-red-700 font-bold ${props.class}`}>{props.children}</p>
  );
};
