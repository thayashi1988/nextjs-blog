import React from 'react';

type PROPS = {
  margin?: string;
  class?: string;
  children: React.ReactNode;
};

export const Heading1: React.VFC<PROPS> = (props) => {
  const addMarginClass = props.margin ? ` ${props.margin}` : '';
  const addHeadingClass = props.class ? ` ${props.class}` : '';

  return (
    <div className={`md:mb-12 mb-8${addMarginClass}`}>
      <h1 className={`md:text-3xl text-2xl font-bold${addHeadingClass}`}>
        {props.children}
      </h1>
    </div>
  );
};
