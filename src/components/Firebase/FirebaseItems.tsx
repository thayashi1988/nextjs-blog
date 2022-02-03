import React, { useState } from 'react';
import { db } from '../../../firebase';
import { Text } from '@/components/Text/Text';
import { BtnSuccess } from '@/components/Button/BtnSuccess';
import { BtnDanger } from '@/components/Button/BtnDanger';
import { FirebaseInput } from '@/components/Firebase/FirebaseInput';
import { Column } from '@/components/Column/Column';
import { ColumnItem } from '@/components/Column/ColumnItem';

type PROPS = {
  title: string;
  id: string;
  num: number;
};

export const FirebaseItems: React.VFC<PROPS> = (props) => {
  const [title, setTitle] = useState(props.title);

  //入力データでfirebaseのデータを更新
  const editTask = (): void => {
    db.collection('tasks').doc(props.id).set({ title: title }, { merge: true });
  };

  //firebaseのデータを削除
  const deleteTask = (): void => {
    db.collection('tasks').doc(props.id).delete();
  };

  // インプットイベント
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    console.log('e.target.value:', e.target.value);
  };

  return (
    <li className="border-b-2 border-blue-500 mb-5">
      <Column>
        <ColumnItem col="8" colSm="3" class="sm:w-3/6 md:w-7/12">
          <Text class="text-base sm:text-lg">
            <span className="font-bold">タスクNo {props.num}</span>
            <br />
            {props.title}
          </Text>
        </ColumnItem>
        <ColumnItem col="4" colSm="3" class="sm:w-3/6 md:w-5/12">
          <FirebaseInput value={title} name="taskName" change={inputChange} />
          <Column class="mb-0">
            <ColumnItem col="6" colSm="3" class="w-3/6">
              <BtnSuccess margin="mb-0 mt-2" link={false} click={editTask}>
                タスク編集
              </BtnSuccess>
            </ColumnItem>
            <ColumnItem col="6" colSm="3" class="w-3/6">
              <BtnDanger margin="mb-0 mt-2" link={false} click={deleteTask}>
                タスク削除
              </BtnDanger>
            </ColumnItem>
          </Column>
        </ColumnItem>
      </Column>
    </li>
  );
};
