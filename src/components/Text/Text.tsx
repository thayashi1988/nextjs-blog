import React from 'react';

type PROPS = {
  class?: string;
  children: React.ReactNode;
};

export const Text: React.VFC<PROPS> = (props) => {
  const { class: className, children } = props;
  const addTextClass = className ? ` ${className}` : '';

  return <p className={`text-sm mb-3${addTextClass}`}>{children}</p>;
};
