// react
import React from 'react';
// @material-ui
import { makeStyles } from '@material-ui/core/styles';

//material-uiのstyle
const useStyles = makeStyles({
  root: {
    gridRow: 1,
  },
});

export function ChatList() {
  const classes = useStyles();
  return <div className={classes.root}>ChatListChatList</div>;
}
