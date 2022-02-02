import type { VFC } from 'react';
import React from 'react';

type PROPS = {
  class?: string;
  children: React.ReactNode;
};

export const Text: VFC<PROPS> = (props) => {
  return <p className={`text-sm mb-3 ${props.class}`}>{props.children}</p>;
};
