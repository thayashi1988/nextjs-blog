// react
import type { VFC } from 'react';
import React from 'react';

// type PROPS = {
//   innerRef?: string;
//   style?: object;
//   class?: string;
//   innerHTML?: any;
//   children?: React.ReactNode;
// };

// eslint-disable-next-line react/display-name
export const HunterList: VFC = React.forwardRef((props: any, ref: any) => {
  const provided = props.provided;

  return (
    <div
      ref={ref}
      className={`w-full text-white text-xs border border-solid border-blue-600 flex items-start justify-center bg-gray-200 bg-opacity-60 ${props.class}`}
      style={props.style}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      dangerouslySetInnerHTML={props.innerHTML}>
      {props.children}
    </div>
  );
});
