import React from 'react';

type PROPS = {
  class?: string;
  children: React.ReactNode;
};

export const TextAlert: React.VFC<PROPS> = (props) => {
  const addTextClass = props.class ? ` ${props.class}` : '';

  return (
    <p className={`text-red-700 text-sm${addTextClass}`}>{props.children}</p>
  );
};
