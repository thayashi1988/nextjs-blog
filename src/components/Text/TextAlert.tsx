import React from 'react';

type PROPS = {
  class?: string;
  children: React.ReactNode;
};

export const TextAlert: React.VFC<PROPS> = (props) => {
  const { class: className, children } = props;
  const addTextClass = className ? ` ${className}` : '';

  return <p className={`text-red-700 text-sm${addTextClass}`}>{children}</p>;
};
