import React from 'react';

type PROPS = {
  class?: string;
  children: React.ReactNode;
};

export const GridItem: React.VFC<PROPS> = (props) => {
  const { class: className, children } = props;
  const addGridClass = className ? `${className}` : '';

  return <div className={`${addGridClass}`}>{children}</div>;
};
