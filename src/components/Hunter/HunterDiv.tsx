import type { VFC } from 'react';
import React from 'react';

// eslint-disable-next-line react/display-name
export const HunterDiv: VFC = React.forwardRef((props: any, ref: any) => {
  const okok = props.provided;
  // console.log('props.provided:', props.provided);

  return (
    <div
      ref={ref}
      style={props.style}
      className={`w-full text-white text-xs border border-solid border-blue-600 flex items-start justify-center bg-gray-200 bg-opacity-60 ${props.class}`}
      {...okok.draggableProps}
      {...okok.dragHandleProps}>
      {props.children}
    </div>
  );
});
