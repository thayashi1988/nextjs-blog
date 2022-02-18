import React, { useEffect, useRef, memo } from 'react';
import { GravatarPath } from '@/components/Img/Gravatar';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from '@material-ui/core';

type PROPS = {
  isLastItem: boolean;
  name: string;
  text: string;
};

export const ChatListMessages: React.VFC<PROPS> = memo((props) => {
  const { isLastItem, name, text } = props;
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
            className="inline"
            color="textPrimary">
            {text}
          </Typography>
        }
      />
    </ListItem>
  );
});
