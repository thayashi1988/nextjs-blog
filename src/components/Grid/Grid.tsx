import React from 'react';

type PROPS = {
  class?: string;
  children: React.ReactNode;
};

export const Grid: React.VFC<PROPS> = (props) => {
  const addGridClass = props.class ? ` ${props.class}` : '';

  return <div className={`grid${addGridClass}`}>{props.children}</div>;
};
