import React from 'react';

type PROPS = {
  margin?: string;
  class?: string;
  children: React.ReactNode;
};

export const Heading1: React.VFC<PROPS> = (props) => {
  const { margin, class: className, children } = props;
  const addMarginClass = margin ? ` ${margin}` : '';
  const addHeadingClass = className ? ` ${className}` : '';

  return (
    <div className={`md:mb-12 mb-8${addMarginClass}`}>
      <h1 className={`md:text-3xl text-2xl font-bold${addHeadingClass}`}>
        {children}
      </h1>
    </div>
  );
};
