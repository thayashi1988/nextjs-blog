import React, { useState } from 'react';
import { GravatarPath } from '../img/Gravatar';
import { MessageField } from '../form/MessageField';

// @material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Avatar } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    gridRow: 2,
  },
});

export function ChatListInput(props) {
  const [text, setText] = useState('');
  const classes = useStyles();
  const avatarPath = GravatarPath(props.avatar);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={1}>
          <Avatar src={avatarPath} />
        </Grid>
        <Grid item xs={10}>
          <MessageField name={props.userName} setText={setText} text={text} />
        </Grid>
        <Grid item xs={1}>
          ボタン
        </Grid>
      </Grid>
    </div>
  );
}
