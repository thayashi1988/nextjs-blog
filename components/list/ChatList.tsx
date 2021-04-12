// react
import type { VFC } from 'react';
import React, { useState, useEffect } from 'react';

// components
import { ChatListMessages } from './ChatListMessages';

// firebase
import { messagesRef } from '../../firebase';

// @material-ui
import { makeStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core/';

//material-uiのstyle
const useStyles = makeStyles({
  root: {
    gridRow: 1,
    overflow: 'auto',
    width: '100%',
  },
});

export const ChatList: VFC = () => {
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
          const [key, datas]: any = entry;
          return { key: key, ...datas };
        });
        console.log('newMessages:', newMessages);
        setMessages(newMessages);
      });
  }, []);

  const messagesLen = messages.length;

  return (
    <List className={classes.root}>
      {messages.map(({ key, name, text }, index) => {
        const isLastItem = messagesLen === index + 1;
        return (
          <ChatListMessages
            key={key}
            name={name}
            text={text}
            isLastItem={isLastItem}
          />
        );
      })}
    </List>
  );
};
