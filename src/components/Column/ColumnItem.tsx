import React from 'react';

type PROPS = {
  class?: string;
  children: React.ReactNode;
};

export const ColumnItem: React.VFC<PROPS> = (props) => {
  const addColumnClass = props.class ? ` ${props.class}` : '';

  return (
    <div className={`w-full px-2 pt-2${addColumnClass}`}>{props.children}</div>
  );
};
