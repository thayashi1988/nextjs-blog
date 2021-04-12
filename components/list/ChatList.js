// react
import React, { useState, useEffect } from 'react';

// components
import { ChatListMessages } from './ChatListMessages';

// firebase
import { messagesRef } from '../../firebase';

// @material-ui
import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from '@material-ui/core/';

//material-uiのstyle
const useStyles = makeStyles({
  root: {
    gridRow: 1,
    overflow: 'auto',
    width: '100%',
  },
});

export function ChatList() {
  const [messages, setMessages] = useState([]);
  const classes = useStyles();

  //firebaseからのデータ取得
  useEffect(() => {
    messagesRef
      .orderByKey()
      .limitToLast(15)
      .on('value', (snapshot) => {
        const messages = snapshot.val();
        if (messages === null) return;
        const entries = Object.entries(messages);
        const newMessages = entries.map((entry) => {
          // const key = entry[0];
          // const datas = entry[1]
          const [key, datas] = entry;
          return { key: key, ...datas };
        });
        console.log('newMessages:', newMessages);
        setMessages(newMessages);
      });
  }, []);

  return (
    <List className={classes.root}>
      {messages.map(({ key, name, text }) => {
        return (
          <ChatListMessages key={key} name={name} text={text}>
            item
          </ChatListMessages>
        );
      })}
    </List>
  );
}
