import React from 'react';

type PROPS = {
  margin?: string;
  class?: string;
  children: React.ReactNode;
};

export const Heading2: React.VFC<PROPS> = (props) => {
  const addMarginClass = props.margin ? ` ${props.margin}` : '';
  const addHeadingClass = props.class ? ` ${props.class}` : '';

  return (
    <div className={`md:mb-10 mb-6${addMarginClass}`}>
      <h2 className={`md:text-2xl text-xl font-bold${addHeadingClass}`}>
        {props.children}
      </h2>
    </div>
  );
};
