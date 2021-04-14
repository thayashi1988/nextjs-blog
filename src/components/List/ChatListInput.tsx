// react
import type { VFC } from 'react';
import React, { useState, useRef } from 'react';

// components
import { GravatarPath } from '../Img/Gravatar';
import { MessageField } from '../Form/MessageField';
import { MessageSubmitButton } from '../Button/MessageSubmitButton';

// @material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Avatar } from '@material-ui/core';

//material-uiのstyle
const useStyles = makeStyles({
  root: {
    gridRow: 2,
  },
});

type PROPS = {
  avatar: string;
  userName: string | string[];
};

export const ChatListInput: VFC<PROPS> = (props) => {
  const inputEl = useRef(null);
  const [inputText, setInputText] = useState<string>('');
  const classes = useStyles();
  const avatarPath = GravatarPath(props.avatar);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <span className="text-xs">
            ようそこ！<span className="text-blue-500">{props.userName}</span>
            さん
          </span>
          <Avatar className="m-auto my-0" src={avatarPath} />
        </Grid>
        <Grid item xs={9}>
          <MessageField
            inputEl={inputEl}
            userName={props.userName}
            setInputText={setInputText}
            inputText={inputText}
          />
        </Grid>
        <Grid item xs={1}>
          <MessageSubmitButton
            inputEl={inputEl}
            userName={props.userName}
            setInputText={setInputText}
            inputText={inputText}
          />
        </Grid>
      </Grid>
    </div>
  );
};
