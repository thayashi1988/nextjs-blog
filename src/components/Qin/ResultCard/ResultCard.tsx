import React from 'react';

type PROPS = {
  class?: string;
  children: React.ReactNode;
};

export const ResultCard: React.VFC<PROPS> = (props) => {
  const addClassName = props.class ? ` ${props.class}` : '';
  return (
    <div
      className={`shadow-gray-300/50 rounded overflow-hidden shadow-lg sm:max-w-xl mx-auto p-4 sm:p-8${addClassName}`}>
      {props.children}
    </div>
  );
};
