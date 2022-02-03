import React, { useState, useEffect } from 'react';
import { ChatListMessages } from './ChatListMessages';
import { messagesRef } from '../../../firebase';
import { makeStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core/';

type MESSAGEPROPS = {
  key: string;
  name: string;
  text: string;
}[];

//material-uiのstyle
const useStyles = makeStyles({
  root: {
    gridRow: 1,
    overflow: 'auto',
    width: '100%',
  },
});

export const ChatList: React.VFC = () => {
  const [messages, setMessages] = useState<MESSAGEPROPS>([]);
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
          console.log('entry:', entry);
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
