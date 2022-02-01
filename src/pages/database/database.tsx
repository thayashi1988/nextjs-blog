import type { VFC } from 'react';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Btn } from '@/components/Button/Btn';
import { FirebaseItems } from '@/components/Firebase/FirebaseItems';
import { db } from '../../../firebase';
import { LoadingFirebase } from '@/components/Loading/LoadingFirebase';

export const DataBase: VFC = () => {
  const [tasks, setTasks] = useState([{ id: '', title: '' }]);
  const [isfetch, setIsfetch] = useState(false);
  const [input, setInput] = useState('');

  // firebaseのデータを取得;
  useEffect(() => {
    const unSub = db.collection('tasks').onSnapshot((snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({ id: doc.id, title: doc.data().title }))
      );
      setIsfetch(true);
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

  if (!isfetch) {
    return <LoadingFirebase />;
  }
  console.log('isfetch:', isfetch);

  return (
    <div>
      <Head>
        <title>firebaseのデータベース読み込み</title>
      </Head>
      <div className="flex justify-center items-center space-x-4 mb-8">
        <input
          className="border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          name="tashname"
          value={input}
          onChange={taskInput}
        />
        <Btn
          link={false}
          class="flex-initial text-sm rounded-xl bg-blue-600 hover:bg-blue-700"
          click={addTask}>
          タスク追加
        </Btn>
      </div>

      <ul>
        {tasks.map((task) => {
          return (
            <FirebaseItems id={task.id} title={task.title} key={task.id} />
          );
        })}
      </ul>
    </div>
  );
};

export default DataBase;
