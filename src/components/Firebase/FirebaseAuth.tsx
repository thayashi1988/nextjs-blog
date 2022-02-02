import { auth } from '../../../firebase';

// ログアウト機能
export const handleLogOut = (): any => {
  return auth.signOut();
};

// ログイン情報取得機能
// export const authProcess = auth.onAuthStateChanged((firebaseDatas: any) => {
//   console.log('firebaseDatas:', firebaseDatas);
//   return firebaseDatas;
// });
