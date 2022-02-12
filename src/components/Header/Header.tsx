import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import React, { useState, useEffect, useRef } from 'react';
import { Text } from '@/components/Text/Text';
import { BtnSecondary } from '@/components/Button/BtnSecondary';
import { NextLink } from '@/components/Link/Link';
import { Heading1 } from '@/components/Heading/Heading1';
import Switch from '@material-ui/core/Switch';
import { auth } from '../../../firebase';

type PROPS = {
  theme?: 'dark' | 'light';
};

export const Header: React.VFC<PROPS> = () => {
  const darkModeSwitchRef = useRef();
  const { theme, setTheme } = useTheme();
  const [state, setState] = useState({
    checkedDarkMode: false,
  });
  const [isLogin, setIsLogin] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const currentPath = router.pathname;

  // ログイン情報を取得
  useEffect(() => {
    theme === 'dark'
      ? setState((s) => ({ checkedDarkMode: true }))
      : setState((s) => ({ checkedDarkMode: false }));

    const authProcess = auth.onAuthStateChanged((firebaseDatas: any) => {
      setIsLogin(firebaseDatas);
    });

    // ログインできたか確認処理
    if (isLogin !== null) {
      const userUid = isLogin.uid;
      const userDisplayName = isLogin.displayName;
      router.push({
        pathname: `/${userUid}/`,
        query: { loginName: userDisplayName },
      });
    } else {
      if (!/.+/.test(currentPath)) {
        router.push({
          pathname: `/`,
        });
      }
    }
    setIsMounted(true);
    return () => authProcess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  // ログアウト機能
  const handleLogOut = (): any => {
    router.push({
      pathname: `/`,
    });
    auth.signOut();
  };

  const handleDarkMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.checked });
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="flex items-center justify-between bg-blue-300 px-2 py-5">
      <NextLink
        href={isLogin ? `/${isLogin.uid}` : '/'}
        margin="!mb-0"
        class="text-black dark:text-white no-underline hover:!text-black dark:hover:text-white hover:no-underline">
        <Heading1 margin="md:mb-0 !mb-0">Next.jsアプリ</Heading1>
      </NextLink>
      <div className="flex flex-col-reverse md:flex-row items-center">
        {isLogin ? (
          <BtnSecondary link={false} margin="mb-0 md:mr-5" click={handleLogOut}>
            ログアウト
          </BtnSecondary>
        ) : null}
        <div className="flex flex-col items-center">
          <Switch
            inputRef={darkModeSwitchRef}
            checked={state.checkedDarkMode}
            onChange={handleDarkMode}
            color="primary"
            name="checkedDarkMode"
            inputProps={{ 'aria-label': 'ダークモードスイッチ' }}
          />
          <Text class="md:mb-0">
            <>
              {isMounted && theme === 'dark' ? 'ダークモード' : 'ライトモード'}
            </>
          </Text>
        </div>
      </div>
    </header>
  );
};
