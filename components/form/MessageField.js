import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { pushMessage } from '../../firebase';

// @material-ui
import { TextField } from '@material-ui/core';

export function MessageField({ name, setText, text }) {
  const [isComposed, setIsComposed] = useState(false);
  const router = useRouter();

  const inputText = (e) => {
    const targetText = e.target.value;
    if (targetText === '') return;
    setText(targetText);
  };

  const keydownText = (e) => {
    if (isComposed) return;

    const targetKeydownText = e.target.value;
    if (targetKeydownText === '') return;

    const pressKey = e.key;
    if (pressKey === 'Enter') {
      pushMessage({ name: router.query.userName, text: targetKeydownText });
      setText('');
      e.preventDefault();
      console.log('firebaseへプッシュ');
    }
  };

  // console.log('text:', text);
  return (
    <TextField
      onChange={inputText}
      onKeyDown={keydownText}
      onCompositionStart={() => setIsComposed(true)}
      onCompositionEnd={() => setIsComposed(false)}
      fullWidth={true}
      value={text}
    />
  );
}
