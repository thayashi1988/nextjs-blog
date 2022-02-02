import type { VFC } from 'react';
import React from 'react';

type PROPS = {
  small?: Boolean;
  mark: string;
  class?: string;
  children: React.ReactNode;
};

export const ListItem: VFC<PROPS> = (props) => {
  const addListItemClass = props.class ? ` ${props.class}` : '';

  if (!props.small) {
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
