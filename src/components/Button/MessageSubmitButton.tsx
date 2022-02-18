import React, { memo } from 'react';
import { pushMessage } from '../../../firebase';
import { IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

type PROPS = {
  inputEl: React.MutableRefObject<HTMLInputElement>;
  userName: string | string[];
  setInputText: React.Dispatch<string>;
  inputText: string;
};

export const MessageSubmitButton: React.VFC<PROPS> = memo(
  ({ inputEl, userName, setInputText, inputText }) => {
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
);
