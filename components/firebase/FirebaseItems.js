import React, { useState } from 'react';
import { Btn } from '../button/Btn';
import { db } from '../../firebase';

const FirebaseItems = (props) => {
  const [title, setTitle] = useState(props.title);

  //入力データでfirebaseのデータを更新
  const editTask = () => {
    db.collection('tasks').doc(props.id).set({ title: title }, { merge: true });
  };

  //firebaseのデータを削除
  const deleteTask = () => {
    db.collection('tasks').doc(props.id).delete();
  };

  // インプットイベント
  const inputChange = (e) => {
    setTitle(e.target.value);
    console.log('e.target.value:', e.target.value);
  };
  return (
    <li className="flex items-center justify-between space-x-2 text-blue-500 border-b-2 border-blue-500 mb-8 pb-2">
      {props.title}
      <div className="flex items-center justify-between space-x-2">
        <div className="flex flex-col">
          <input
            className="border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-xs p-2"
            name="tashname"
            value={title}
            onChange={inputChange}
          />
          <div className="flex space-x-4 mt-2 mx-0 items-center justify-between">
            <Btn
              link={false}
              class="flex-initial text-sm rounded-xl bg-green-600 hover:bg-green-700"
              click={editTask}
            >
              タスク編集
            </Btn>
            <Btn
              link={false}
              class="flex-initial text-sm rounded-xl bg-red-600 hover:bg-red-700"
              click={deleteTask}
            >
              タスク削除
            </Btn>
          </div>
        </div>
      </div>
    </li>
  );
};

export default FirebaseItems;
