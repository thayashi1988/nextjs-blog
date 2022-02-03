// import React, { useState, useEffect } from 'react';
import { fbApp, auth } from '../../../firebase';

// ログアウト機能
export const handleLogOut = (): any => {
  return auth.signOut();
};

// ログイン機能
export const handleLogIn = (): any => {
  const provider = new fbApp.auth.GoogleAuthProvider();
  return auth.signInWithRedirect(provider);
};

// ログイン情報取得機能
// export const GetAuthInfo = () => {
//   // ログイン情報
//   const [user, setUser] = useState(null);

//   //ボタン活性化
//   useEffect(() => {
//     const authProcess = auth.onAuthStateChanged((userInfo: any) => {
//       setUser(userInfo);
//     });
//     return () => authProcess();
//   }, []);
//   console.log('user:', user);
//   return user;
// };
