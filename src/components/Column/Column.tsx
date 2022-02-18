import React from 'react';

type PROPS = {
  class?: string;
  children: React.ReactNode;
};

export const Column: React.VFC<PROPS> = (props) => {
  const { class: className, children } = props;
  const addColumnClass = className ? ` ${className}` : '';

  return (
    <div className={`flex flex-wrap -mx-2 -mt-2 mb-5${addColumnClass}`}>
      {children}
    </div>
  );
};
