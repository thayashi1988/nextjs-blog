import type { VFC } from 'react';
import React, { useEffect, useRef } from 'react';
import { GravatarPath } from '@/components/Img/Gravatar';
import { makeStyles } from '@material-ui/core/styles';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from '@material-ui/core';

//material-uiのstyle
const useStyles = makeStyles({
  inline: {
    display: 'inline',
  },
});

type PROPS = {
  isLastItem: boolean;
  name: string;
  text: string;
};

export const ChatListMessages: React.VFC<PROPS> = ({
  isLastItem,
  name,
  text,
}) => {
  const classes = useStyles();
  const ref = useRef(null);
  const avatarPath = GravatarPath(name);

  useEffect(() => {
    if (isLastItem) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isLastItem]);

  return (
    <ListItem ref={ref} divider>
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
};
