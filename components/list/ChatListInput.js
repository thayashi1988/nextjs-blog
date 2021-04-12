// react
import React, { useState, useRef } from 'react';

// components
import { GravatarPath } from '../img/Gravatar';
import { MessageField } from '../form/MessageField';
import { MessageSubmitButton } from '../button/MessageSubmitButton';

// @material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Avatar } from '@material-ui/core';

//material-uiのstyle
const useStyles = makeStyles({
  root: {
    gridRow: 2,
  },
});

export function ChatListInput(props) {
  const inputEl = useRef(null);
  const [inputText, setInputText] = useState('');
  const classes = useStyles();
  const avatarPath = GravatarPath(props.avatar);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={1}>
          <Avatar src={avatarPath} />
        </Grid>
        <Grid item xs={10}>
          <MessageField
            inputEl={props.inputEl}
            userName={props.userName}
            setInputText={setInputText}
            inputText={inputText}
          />
        </Grid>
        <Grid item xs={1}>
          <MessageSubmitButton
            userName={props.userName}
            setInputText={setInputText}
            inputText={inputText}
          />
        </Grid>
      </Grid>
    </div>
  );
}
