// react
import type { DOMAttributes, VFC } from 'react';
import React from 'react';

type PROPS = {
  innerRef?: string;
  style?: object;
  class?: string;
  innerHTML?: any;
  children?: React.ReactNode;
};

export const HunterList = React.forwardRef((props: any, ref: any) => {
  const provided = props.provided;

  return (
    <div
      ref={ref}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={props.style}
      className={`w-full text-white text-xs border border-solid border-blue-600 flex items-start justify-center bg-gray-200 bg-opacity-60 ${props.class}`}
      dangerouslySetInnerHTML={props.innerHTML}>
      {props.children}
    </div>
  );
});

// export const HunterList: VFC<PROPS> = (props) => {
//   return (
//     <div
//       ref={props.innerRef}
//       style={props.style}
//       className={`w-full text-white text-xs border border-solid border-blue-600 flex items-start justify-center bg-gray-200 bg-opacity-60 ${props.class}`}
//       dangerouslySetInnerHTML={props.innerHTML}>
//       {props.children}
//     </div>
//   );
// };
