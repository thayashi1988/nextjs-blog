import React, { useState, useEffect, memo } from 'react';
import { ChatListMessages } from '@/components/List/ChatListMessages';
import { List } from '@material-ui/core/';
import { messagesRef } from '../../../firebase';

type MESSAGEPROPS = {
  key: string;
  name: string;
  text: string;
}[];

export const ChatList: React.VFC = memo(() => {
  const [messages, setMessages] = useState<MESSAGEPROPS>([]);

  //firebaseからのデータ取得
  useEffect(() => {
    const messagesRefFunc = () => {
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
            // console.log('entry:', entry);
            const [key, datas]: any = entry;
            return { key: key, ...datas };
          });
          setMessages(newMessages);
        });
    };
    messagesRefFunc();
    return () => messagesRefFunc();
  }, []);

  const messagesLen = messages.length;

  return (
    <List>
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
});
