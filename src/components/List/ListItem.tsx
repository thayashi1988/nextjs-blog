import React from 'react';

type PROPS = {
  notice?: Boolean;
  mark: string;
  class?: string;
  children: React.ReactNode;
};

export const ListItem: React.VFC<PROPS> = (props) => {
  const addListItemClass = props.class ? ` ${props.class}` : '';
  const textSize = props.notice ? true : false;
  console.log('textSize:', textSize);

  if (!textSize) {
    return (
      <li className={`mb-1 text-sm table${addListItemClass}`}>
        <span className="table-cell">{props.mark}</span>
        {props.children}
      </li>
    );
  } else {
    return (
      <li className={`mb-1 text-xs table${addListItemClass}`}>
        <span className="table-cell">{props.mark}</span>
        {props.children}
      </li>
    );
  }
};
