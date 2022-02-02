import type { VFC } from 'react';
import React from 'react';

type PROPS = {
  class?: string;
  children: React.ReactNode;
};

export const Heading1: VFC<PROPS> = (props) => {
  return (
    <div className={`md:mb-12 mb-8`}>
      <h1 className={`md:text-3xl text-2xl font-bold ${props.class}`}>
        {props.children}
      </h1>
    </div>
  );
};
