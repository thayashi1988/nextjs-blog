import React, { useState, useRef } from 'react';
import { GravatarPath } from '@/components/Img/Gravatar';
import { MessageField } from '@/components/Form/MessageField';
import { MessageSubmitButton } from '@/components/Button/MessageSubmitButton';
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

export const ChatListInput: React.VFC<PROPS> = (props) => {
  const inputEl = useRef(null);
  const [inputText, setInputText] = useState<string>('');
  const classes = useStyles();
  const avatarPath = GravatarPath(props.avatar);

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={12} sm={2} md={2}>
          <span className="text-xs block text-center">
            ようそこ！
            <br className="hidden sm:block" />
            <span className="text-blue-500">{props.userName}</span>
            さん
          </span>
          <Avatar className="m-auto my-0" src={avatarPath} />
        </Grid>
        <Grid item xs={10} sm={9} md={9}>
          <MessageField
            inputEl={inputEl}
            userName={props.userName}
            setInputText={setInputText}
            inputText={inputText}
          />
        </Grid>
        <Grid item xs={1} sm={1} md={1}>
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
