import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from 'src/components/Layout/layout';
import { Btn } from 'src/components/Button/Btn';
import { fbApp, auth } from '../../../firebase';

export default function Login(): JSX.Element {
  const [user, setUser] = useState(null);
  const [isNull, setIsNull] = useState();

  // user情報を取得
  useEffect(() => {
    const authProcess = auth.onAuthStateChanged((user: any) => {
      setUser(user);
      setIsNull(user);
      console.log('isNull:', isNull);
    });
    return () => authProcess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ログイン機能
  // firebase/appからのメソッドが必要（fbApp）
  const login = (): void => {
    const provider = new fbApp.auth.GoogleAuthProvider();
    auth.signInWithRedirect(provider);
  };

  // ログアウト機能
  const logout = (): void => {
    auth.signOut();
  };

  const IsLogin = (props) => {
    if (props.isNull === null) {
      return (
        <div>
          <h2>ログインしてください。</h2>
          <Btn link={false} click={login}>
            Google Login
          </Btn>
        </div>
      );
    } else {
      return (
        <div>
          <h2>ログインしました！</h2>
          <p>あなたのUID: {user && user.uid}</p>
          <Btn link={false} click={logout}>
            Google Logout
          </Btn>
        </div>
      );
    }
  };

  return (
    <div>
      <Head>
        <title>firebaseでのGoogle認証</title>
      </Head>
      <IsLogin isNull={isNull} />
    </div>
  );
}
