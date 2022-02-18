import React, { useState, useCallback, memo } from 'react';
import { Text } from '@/components/Text/Text';
import { BtnSuccess } from '@/components/Button/BtnSuccess';
import { BtnDanger } from '@/components/Button/BtnDanger';
import { FirebaseInput } from '@/components/Firebase/FirebaseInput';
import { Column } from '@/components/Column/Column';
import { ColumnItem } from '@/components/Column/ColumnItem';
import { db } from '../../../firebase';

type PROPS = {
  title: string;
  id: string;
  num: number;
};

export const FirebaseItems: React.VFC<PROPS> = memo((props) => {
  const { title: taskTitle, id: taskId, num: taskNum } = props;
  const [title, setTitle] = useState(taskTitle);

  //入力データでfirebaseのデータを更新
  const editTask = useCallback((): void => {
    db.collection('tasks').doc(taskId).set({ title: title }, { merge: true });
  }, [title, taskId]);

  //firebaseのデータを削除
  const deleteTask = useCallback((): void => {
    db.collection('tasks').doc(taskId).delete();
  }, [taskId]);

  // インプットイベント
  const inputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setTitle(e.target.value);
    },
    [setTitle]
  );

  return (
    <li className="border-b-2 border-blue-500 mb-5">
      <Column>
        <ColumnItem class="sm:w-6/12 md:w-7/12">
          <Text class="text-base sm:text-lg">
            <span className="font-bold">タスクNo {taskNum}</span>
            <br />
            {taskTitle}
          </Text>
        </ColumnItem>
        <ColumnItem class="sm:w-6/12 md:w-5/12">
          <FirebaseInput value={title} name="taskName" change={inputChange} />
          <Column class="mb-0">
            <ColumnItem class="w-6/12">
              <BtnSuccess margin="mb-0 mt-2" link={false} click={editTask}>
                タスク編集
              </BtnSuccess>
            </ColumnItem>
            <ColumnItem class="w-6/12">
              <BtnDanger margin="mb-0 mt-2" link={false} click={deleteTask}>
                タスク削除
              </BtnDanger>
            </ColumnItem>
          </Column>
        </ColumnItem>
      </Column>
    </li>
  );
});
