import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { db } from '../../../firebase';
import { Text } from '@/components/Text/Text';
import { Heading1 } from '@/components/Heading/Heading1';
import { Heading2 } from '@/components/Heading/Heading2';
import { Btn } from '@/components/Button/Btn';
import { FirebaseItems } from '@/components/Firebase/FirebaseItems';
import { LoadingFirebase } from '@/components/Loading/LoadingFirebase';
import { FirebaseInput } from '@/components/Firebase/FirebaseInput';

type TASKSTATE = {
  id: string;
  title: string;
}[];

export const Index: NextPage = () => {
  const [tasks, setTasks] = useState<TASKSTATE>([{ id: '', title: '' }]);
  const [isFetch, setIsFetch] = useState<Boolean>(false);
  const [input, setInput] = useState<string>('');

  // firebaseのデータを取得;
  useEffect(() => {
    const unSub = db.collection('tasks').onSnapshot((snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({ id: doc.id, title: doc.data().title }))
      );
      setIsFetch(true);
    });
    return () => unSub();
  }, []);

  //入力データをfirebaseに登録
  const addTask = () => {
    db.collection('tasks').add({ title: input });
    setInput('');
  };

  // インプットイベント
  const taskInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  if (!isFetch) {
    return <LoadingFirebase />;
  }
  console.log('isFetch:', isFetch);

  return (
    <>
      <Head>
        <title>Cloud Firestore読み込み | Next.jsアプリ</title>
      </Head>
      <Heading1>Cloud Firestore読み込み</Heading1>
      <Text>
        FirebaseのCloud
        Firestoreを使用して、データの「読み込み・書き込み・削除」を行います。
      </Text>
      <Heading2 margin="md:mb-4 !mb-3">タスク追加</Heading2>
      <div className="flex flex-col sm:flex-row mb-3 sm:mb-8">
        <FirebaseInput value={input} name="taskName" change={taskInput} />
        <Btn
          link={false}
          click={addTask}
          class="h-full"
          margin="mb-0 mt-2 sm:mt-0 sm:ml-4">
          タスクを追加する
        </Btn>
      </div>
      <Heading2 margin="md:mb-4 mb-4">タスク一覧</Heading2>
      <ul>
        {tasks.map((task, index) => {
          return (
            <FirebaseItems
              num={index + 1}
              id={task.id}
              title={task.title}
              key={task.id}
            />
          );
        })}
      </ul>
    </>
  );
};

export default Index;
