import React from 'react';

type PROPS = {
  margin?: string;
  class?: string;
  children: React.ReactNode;
};

export const Heading2: React.VFC<PROPS> = (props) => {
  const { margin, class: className, children } = props;
  const addMarginClass = margin ? ` ${margin}` : '';
  const addHeadingClass = className ? ` ${className}` : '';

  return (
    <div className={`md:mb-10 mb-6${addMarginClass}`}>
      <h2 className={`md:text-2xl text-xl font-bold${addHeadingClass}`}>
        {children}
      </h2>
    </div>
  );
};
