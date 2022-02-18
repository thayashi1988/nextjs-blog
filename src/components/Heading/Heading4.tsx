import React from 'react';

type PROPS = {
  margin?: string;
  class?: string;
  children: React.ReactNode;
};

export const Heading4: React.VFC<PROPS> = (props) => {
  const { margin, class: className, children } = props;
  const addMarginClass = margin ? ` ${margin}` : '';
  const addHeadingClass = className ? ` ${className}` : '';

  return (
    <div className={`mb-2${addMarginClass}`}>
      <h4 className={`text-lg font-bold${addHeadingClass}`}>{children}</h4>
    </div>
  );
};
