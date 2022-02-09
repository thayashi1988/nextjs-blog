import React from 'react';

type PROPS = {
  tag?: string;
  class?: string;
  children: React.ReactNode;
};

export const List: React.VFC<PROPS> = (props) => {
  if (!props.tag) {
    return <ul className={props.class}>{props.children}</ul>;
  } else {
    return <ol className={props.class}>{props.children}</ol>;
  }
};
