import type { VFC } from 'react';
import React from 'react';

type PROPS = {
  class?: string;
  children: React.ReactNode;
};

export const Column: VFC<PROPS> = (props) => {
  return (
    <div className={`flex flex-wrap -mx-2 -mt-2 mb-5 ${props.class}`}>
      {props.children}
    </div>
  );
};
