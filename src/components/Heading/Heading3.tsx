import type { VFC } from 'react';
import React from 'react';

type PROPS = {
  margin?: string;
  class?: string;
  children: React.ReactNode;
};

export const Heading3: VFC<PROPS> = (props) => {
  const addMarginClass = props.margin ? ` ${props.margin}` : '';
  const addHeadingClass = props.class ? ` ${props.class}` : '';

  return (
    <div className={`mb-4${addMarginClass}`}>
      <h3 className={`md:text-xl text-lg font-bold${addHeadingClass}`}>
        {props.children}
      </h3>
    </div>
  );
};
