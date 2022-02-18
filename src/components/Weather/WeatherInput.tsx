import React, { memo } from 'react';

type PROPS = {
  class?: string;
  change: React.ChangeEventHandler<HTMLInputElement>;
  keypress: React.KeyboardEventHandler<HTMLInputElement>;
};

export const WeatherInput: React.VFC<PROPS> = memo((props) => {
  return (
    <input
      type="text"
      onChange={props.change}
      onKeyPress={props.keypress}
      className={props.class}
      placeholder="地域コードを入力..."
    />
  );
});
