import React from 'react';

type PROPS = {
  notice?: Boolean;
  mark: string;
  class?: string;
  children: React.ReactNode;
};

export const ListItem: React.VFC<PROPS> = (props) => {
  const { notice, mark, class: className, children } = props;
  const addListItemClass = className ? ` ${className}` : '';
  const textSize = notice ? true : false;

  if (!textSize) {
    return (
      <li className={`mb-1 text-sm table${addListItemClass}`}>
        <span className="table-cell">{mark}</span>
        {children}
      </li>
    );
  } else {
    return (
      <li className={`mb-1 text-xs table${addListItemClass}`}>
        <span className="table-cell">{mark}</span>
        {children}
      </li>
    );
  }
};
