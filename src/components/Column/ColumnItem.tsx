import React from 'react';

type PROPS = {
  col: string;
  colSm: string;
  class?: string;
  children: React.ReactNode;
};

export const ColumnItem: React.VFC<PROPS> = (props) => {
  // console.log('props.col:', `md:w-${props.col}/12`);
  const addColumnClass = props.class ? ` ${props.class}` : '';

  return (
    <div
      className={`w-full sm:w-${props.colSm}/6 md:w-${props.col}/12 px-2 pt-2${addColumnClass}`}>
      {props.children}
    </div>
  );
};
