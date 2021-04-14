// react
import type { DOMAttributes, VFC } from 'react';
import React from 'react';

type PROPS = {
  classPositionLeft: string;
  styleWidth: string | number;
  styleTop: string | number;
  styleLeft: string | number;
  children?: React.ReactNode;
};

export const HunterListWrap: VFC<PROPS> = (props) => {
  return (
    <div
      className={`h-full w-3/12 absolute ${props.classPositionLeft}`}
      style={{
        width: `${props.styleWidth}%`,
        top: `${props.styleTop}%`,
        left: `-${props.styleLeft}%`,
      }}>
      {props.children}
    </div>
  );
};
