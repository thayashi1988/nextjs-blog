import React, { useState, useRef, memo } from 'react';
import { GravatarPath } from '@/components/Img/Gravatar';
import { MessageField } from '@/components/Form/MessageField';
import { MessageSubmitButton } from '@/components/Button/MessageSubmitButton';
import { Avatar } from '@material-ui/core';
import { Column } from '@/components/Column/Column';
import { ColumnItem } from '@/components/Column/ColumnItem';

type PROPS = {
  avatar: string;
  userName: string | string[];
};

export const ChatListInput: React.VFC<PROPS> = memo((props) => {
  const { avatar, userName } = props;
  const inputEl = useRef(null);
  const [inputText, setInputText] = useState<string>('');
  const avatarPath = GravatarPath(avatar);

  return (
    <div>
      <Column>
        <ColumnItem class="sm:w-2/12">
          <span className="text-xs block text-center">
            ようそこ！
            <br className="hidden sm:block" />
            <span className="text-blue-500">{userName}</span>
            さん
          </span>
          <Avatar className="m-auto my-0" src={avatarPath} />
        </ColumnItem>
        <ColumnItem class="w-10/12 sm:w-9/12">
          <MessageField
            inputEl={inputEl}
            userName={userName}
            setInputText={setInputText}
            inputText={inputText}
          />
        </ColumnItem>
        <ColumnItem class="w-1/12 sm:w-1/12">
          <MessageSubmitButton
            inputEl={inputEl}
            userName={userName}
            setInputText={setInputText}
            inputText={inputText}
          />
        </ColumnItem>
      </Column>
    </div>
  );
});
