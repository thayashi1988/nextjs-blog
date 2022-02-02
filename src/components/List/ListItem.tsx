import type { VFC } from 'react';
import React from 'react';

type PROPS = {
  small?: Boolean;
  mark: string;
  class?: string;
  children: React.ReactNode;
};

export const ListItem: VFC<PROPS> = (props) => {
  if (!props.small) {
    return (
      <li className={`mb-1 text-sm table ${props.class}`}>
        <span className="table-cell">{props.mark}</span>
        {props.children}
      </li>
    );
  } else {
    return (
      <li className={`mb-1 text-xs table ${props.class}`}>
        <span className="table-cell">{props.mark}</span>
        {props.children}
      </li>
    );
  }
};
