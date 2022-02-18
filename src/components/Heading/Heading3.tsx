import React from 'react';

type PROPS = {
  margin?: string;
  class?: string;
  children: React.ReactNode;
};

export const Heading3: React.VFC<PROPS> = (props) => {
  const { margin, class: className, children } = props;
  const addMarginClass = margin ? ` ${margin}` : '';
  const addHeadingClass = className ? ` ${className}` : '';

  return (
    <div className={`mb-4${addMarginClass}`}>
      <h3 className={`md:text-xl text-lg font-bold${addHeadingClass}`}>
        {children}
      </h3>
    </div>
  );
};
