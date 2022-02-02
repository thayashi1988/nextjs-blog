import type { VFC } from 'react';
import React from 'react';

type PROPS = {
  class?: string;
  children: React.ReactNode;
};

export const Heading2: VFC<PROPS> = (props) => {
  return (
    <div className={`md:mb-10 mb-6`}>
      <h2 className={`text-black md:text-2xl text-xl font-bold ${props.class}`}>
        {props.children}
      </h2>
    </div>
  );
};
