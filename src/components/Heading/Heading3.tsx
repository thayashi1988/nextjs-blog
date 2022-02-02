import type { VFC } from 'react';
import React from 'react';

type PROPS = {
  class?: string;
  children: React.ReactNode;
};

export const Heading3: VFC<PROPS> = (props) => {
  return (
    <div className={`mb-4`}>
      <h3 className={`text-black md:text-xl text-lg font-bold ${props.class}`}>
        {props.children}
      </h3>
    </div>
  );
};
