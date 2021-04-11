import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../../components/layout';
import { Btn } from '../../components/button/Btn';
import FirebaseItems from '../../components/firebase/FirebaseItems';
import { db } from '../../firebase';

export default function dataBase(props) {
  const [tasks, setTasks] = useState([{ id: '', title: '' }]);
  const [isfetch, setIsfetch] = useState(false);
  const [input, setInput] = useState('');

  // firebaseのデータを取得;
  // useEffect(() => {
  //   const unSub = db.collection('tasks').onSnapshot((snapshot) => {
  //     setTasks(
  //       snapshot.docs.map((doc) => ({ id: doc.id, title: doc.data().title }))
  //     );
  //     setIsfetch(true);
  //   });
  //   return () => unSub();
  // }, []);

  //入力データをfirebaseに登録
  const addTask = () => {
    db.collection('tasks').add({ title: input });
    setInput('');
  };

  // インプットイベント
  const taslInput = (e) => {
    setInput(e.target.value);
  };

  // 条件処理
  function Loading() {
    if (!isfetch) {
      return (
        <div className="border border-gray-100 shadow rounded-md p-4 w-full">
          <div className="animate-pulse flex justify-between items-center space-x-4">
            <div className="h-4 bg-gray-200 rounded w-3/12"></div>
            <div className="h-4 w-6/12 h-full">
              <div className="h-4 bg-gray-200 rounded w-full w-11/12"></div>
              <div className="flex mt-2 space-x-4">
                <div className="h-4 bg-gray-200 rounded w-4/12"></div>
                <div className="h-4 bg-gray-200 rounded w-4/12"></div>
                <div className="h-4 bg-gray-200 rounded w-4/12"></div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <ul>
        {tasks.map((task, index) => {
          return (
            <FirebaseItems id={task.id} title={task.title} key={task.id} />
          );
        })}
      </ul>
    );
  }
  console.log('tasks:', tasks);
  console.log('isfetch:', isfetch);

  return (
    <Layout>
      <Head>
        <title>firebaseのデータベース読み込み</title>
      </Head>
      {/* <div className="flex justify-center items-center space-x-4 mb-8">
        <input
          className="border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          name="tashname"
          value={input}
          onChange={taslInput}
        />
        <Btn
          link={false}
          class="flex-initial text-sm rounded-xl bg-blue-600 hover:bg-blue-700"
          click={addTask}
        >
          タスク追加
        </Btn>
      </div> */}

      <Loading isfetch={isfetch} />
    </Layout>
  );
}
