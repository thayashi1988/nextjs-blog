// react
import React, { useState } from 'react';

// firebase
import { pushMessage } from '../../firebase';

// @material-ui
import { TextField } from '@material-ui/core';

export function MessageField({ inputEl, userName, setInputText, inputText }) {
  const [isComposed, setIsComposed] = useState(false);
  console.log('inputText:', inputText);

  //入力テキストを取得
  const changeText = (e) => {
    const targetText = e.target.value;
    setInputText(targetText);
  };

  //Enterキーでのfirebaseへの送信制御
  const keydownText = (e) => {
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
}
