// react
import type { VFC } from 'react';
import React from 'react';

// firebase
import { pushMessage } from '../../firebase';

// @material-ui
import { IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

type ARG = {
  inputEl: React.MutableRefObject<HTMLInputElement>;
  userName: string | string[];
  setInputText: React.Dispatch<string>;
  inputText: string;
};

export const MessageSubmitButton: VFC<ARG> = ({
  inputEl,
  userName,
  setInputText,
  inputText,
}) => {
  const sendFirebase = () => {
    pushMessage({ name: userName, text: inputText });
    setInputText('');
    inputEl.current.focus();
  };
  return (
    <IconButton disabled={inputText === ''} onClick={sendFirebase}>
      <SendIcon color={inputText === '' ? 'disabled' : 'primary'} />
    </IconButton>
  );
};
