import React, { memo } from 'react';

type PROPS = {
  value: string;
  class?: string;
  name: string;
  change: React.ChangeEventHandler<HTMLInputElement>;
};

export const FirebaseInput: React.VFC<PROPS> = memo((props) => {
  console.log('FirebaseInput レンダリング:');
  const addFirebaseInputClass = props.class ? ` ${props.class}` : '';
  return (
    <input
      className={`w-full max-w-full sm:max-w-[400px] h-[45px] rounded border border-gray-500 focus:ring-1 focus:ring-gray-500 focus-visible:outline-none text-base p-2${addFirebaseInputClass}`}
      name={props.name}
      value={props.value}
      onChange={props.change}
    />
  );
});
