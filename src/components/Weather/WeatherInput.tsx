import React, { memo } from 'react';

type PROPS = {
  class?: string;
  change: React.ChangeEventHandler<HTMLInputElement>;
  keypress: React.KeyboardEventHandler<HTMLInputElement>;
};

export const WeatherInput: React.VFC<PROPS> = memo((props) => {
  const { class: className, change, keypress } = props;
  return (
    <input
      type="text"
      onChange={change}
      onKeyPress={keypress}
      className={className}
      placeholder="地域コードを入力..."
    />
  );
});
