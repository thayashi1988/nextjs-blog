// react
import React, { useState, useRef } from 'react';

// components
import { GravatarPath } from '../img/Gravatar';

// @material-ui
import { makeStyles } from '@material-ui/core/styles';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from '@material-ui/core';

//material-uiのstyle
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export function ChatListMessages({ name, text }) {
  const classes = useStyles();
  const avatarPath = GravatarPath(name);

  return (
    <ListItem divider>
      <ListItemAvatar>
        <Avatar alt="" src={avatarPath} />
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={
          <Typography
            component="span"
            variant="body2"
            className={classes.inline}
            color="textPrimary">
            {text}
          </Typography>
        }
      />
    </ListItem>
  );
}
