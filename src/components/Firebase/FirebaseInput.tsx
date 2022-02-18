import React, { memo } from 'react';

type PROPS = {
  value: string;
  class?: string;
  name: string;
  change: React.ChangeEventHandler<HTMLInputElement>;
};

export const FirebaseInput: React.VFC<PROPS> = memo((props) => {
  const { value, class: className, name, change } = props;
  const addFirebaseInputClass = className ? ` ${className}` : '';
  return (
    <input
      className={`w-full max-w-full sm:max-w-[400px] h-[45px] rounded border border-gray-500 focus:ring-1 focus:ring-gray-500 focus-visible:outline-none text-base p-2${addFirebaseInputClass}`}
      name={name}
      value={value}
      onChange={change}
    />
  );
});
