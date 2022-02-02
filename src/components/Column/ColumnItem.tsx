import type { VFC } from 'react';
import React from 'react';

type PROPS = {
  col: string;
  class?: string;
  children: React.ReactNode;
};

export const ColumnItem: VFC<PROPS> = (props) => {
  console.log('props.col:', `md:w-${props.col}/12`);
  // md: w - 4 / 12;
  return (
    <div className={`w-full md:w-${props.col}/12 px-2 pt-2 ${props.class}`}>
      {/* <div className={`w-full md:w-${props.col}/12 px-2 pt-2 ${props.class}`}> */}
      {props.children}
    </div>
  );
};
