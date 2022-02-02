import type { VFC } from 'react';
import React from 'react';

type PROPS = {
  class?: string;
  children: React.ReactNode;
};

export const Text: VFC<PROPS> = (props) => {
  const addTextClass = props.class ? ` ${props.class}` : '';

  return <p className={`text-sm mb-3${addTextClass}`}>{props.children}</p>;
};
