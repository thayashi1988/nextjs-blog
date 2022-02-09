import React from 'react';

type PROPS = {
  margin?: string;
  class?: string;
  children: React.ReactNode;
};

export const Heading4: React.VFC<PROPS> = (props) => {
  const addMarginClass = props.margin ? ` ${props.margin}` : '';
  const addHeadingClass = props.class ? ` ${props.class}` : '';

  return (
    <div className={`mb-2${addMarginClass}`}>
      <h4 className={`text-lg font-bold${addHeadingClass}`}>
        {props.children}
      </h4>
    </div>
  );
};
