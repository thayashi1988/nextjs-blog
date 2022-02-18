import React from 'react';

type PROPS = {
  tag?: string;
  class?: string;
  children: React.ReactNode;
};

export const List: React.VFC<PROPS> = (props) => {
  const { tag: listTag, class: className, children } = props;
  if (!listTag) {
    return <ul className={className}>{children}</ul>;
  } else {
    return <ol className={className}>{children}</ol>;
  }
};
