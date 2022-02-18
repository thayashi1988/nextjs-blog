import React from 'react';

type PROPS = {
  class?: string;
  children: React.ReactNode;
};

export const ColumnItem: React.VFC<PROPS> = (props) => {
  const { class: className, children } = props;
  const addColumnClass = className ? ` ${className}` : '';

  return <div className={`w-full px-2 pt-2${addColumnClass}`}>{children}</div>;
};
