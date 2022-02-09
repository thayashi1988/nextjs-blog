import React from 'react';

type PROPS = {
  class?: string;
  children: React.ReactNode;
};

export const HeadingComponent: React.VFC<PROPS> = (props) => {
  return (
    <div className={`mb-5 border-solid border-b-2 border-sky-500 pb-2`}>
      <h1
        className={`text-black dark:text-white text-3xl font-bold ${props.class}`}>
        {props.children}
      </h1>
    </div>
  );
};
