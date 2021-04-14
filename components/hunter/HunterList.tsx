// react
import type { DOMAttributes, VFC } from 'react';
import React from 'react';

type PROPS = {
  style?: object;
  class?: string;
  innerHTML?: any;
  children?: React.ReactNode;
};

export const HunterList: VFC<PROPS> = (props) => {
  return (
    <div
      style={props.style}
      className={props.class}
      dangerouslySetInnerHTML={props.innerHTML}>
      {props.children}
    </div>
  );
};
