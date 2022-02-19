import React, { useState, memo } from 'react';
import { TextField } from '@material-ui/core';
import { pushMessage } from '../../../firebase';

type PROPS = {
  inputEl: React.MutableRefObject<HTMLInputElement>;
  userName: string | string[];
  setInputText: React.Dispatch<string>;
  inputText: string;
};

export const MessageField: React.VFC<PROPS> = memo((props) => {
  console.log('メッセージフィールドのレンダリング:');
  const { inputEl, userName, setInputText, inputText } = props;
  const [isComposed, setIsComposed] = useState(false);

  //入力テキストを取得
  const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetText = e.target.value;
    setInputText(targetText);
  };

  //Enterキーでのfirebaseへの送信制御（KeyboardEventでe.target.valueが通らない。。）
  const keydownText = (e: React.KeyboardEvent | any) => {
    if (isComposed) return;

    const targetKeydownText = e.target.value;
    if (targetKeydownText === '') return;

    const pressKey = e.key;
    if (pressKey === 'Enter') {
      pushMessage({ name: userName, text: inputText });
      setInputText('');
      e.preventDefault();
    }
  };

  return (
    <TextField
      autoFocus
      inputRef={inputEl}
      onChange={changeText}
      onKeyDown={keydownText}
      onCompositionStart={() => setIsComposed(true)}
      onCompositionEnd={() => setIsComposed(false)}
      fullWidth={true}
      value={inputText}
    />
  );
});
