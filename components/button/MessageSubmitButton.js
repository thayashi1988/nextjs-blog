// react
import React, { useState } from 'react';

// firebase
import { pushMessage } from '../../firebase';

// @material-ui
import { IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

export function MessageSubmitButton({
  inputEl,
  userName,
  setInputText,
  inputText,
}) {
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
}
