import type { VFC } from 'react';
import React from 'react';

type PROPS = {
  class?: string;
  children: React.ReactNode;
};

export const Heading4: VFC<PROPS> = (props) => {
  return (
    <div className={`mb-2`}>
      <h4 className={`text-lg font-bold ${props.class}`}>{props.children}</h4>
    </div>
  );
};
