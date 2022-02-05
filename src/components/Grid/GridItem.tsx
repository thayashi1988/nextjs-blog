import React from 'react';

type PROPS = {
  class?: string;
  children: React.ReactNode;
};

export const GridItem: React.VFC<PROPS> = (props) => {
  const addGridClass = props.class ? `${props.class}` : '';

  return <div className={`${addGridClass}`}>{props.children}</div>;
};
