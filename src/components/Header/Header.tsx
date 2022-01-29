import type { DOMAttributes, VFC } from 'react';
import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import 'tailwindcss/tailwind.css';

// material-ui
import Switch from '@material-ui/core/Switch';

// components
import Link from 'next/link';

type PROPS = {
  theme?: 'dark' | 'light';
  mounted?: boolean;
  toggleDarkMode?: DOMAttributes<HTMLButtonElement>['onClick'];
};

export const Header: VFC<PROPS> = () => {
  const inputEl = useRef();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState({
    checkedDarkMode: false,
  });

  useEffect(() => {
    setMounted(true);
    theme === 'dark'
      ? setState({ ...state, checkedDarkMode: true })
      : setState({ ...state, checkedDarkMode: false });
    // inputEl.current.checked = true;
    // console.log(inputEl);
  }, []);

  const handleDarkMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.checked });
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  // console.log('state:', state);
  // console.log('theme:', theme);

  return (
    <header className="flex items-center justify-between bg-blue-300 p-2">
      <div className="">
        <h1>
          <Link href="/">
            <a className="no-underline hover:no-underline hover:opacity-50">
              ヘッダー
            </a>
          </Link>
        </h1>
      </div>
      <div className="flex flex-col items-center">
        <Switch
          inputRef={inputEl}
          checked={state.checkedDarkMode}
          onChange={handleDarkMode}
          color="primary"
          name="checkedDarkMode"
          inputProps={{ 'aria-label': 'ダークモードスイッチ' }}
        />
        <p>
          {mounted && <>{theme === 'dark' ? 'ダークモード' : 'ライトモード'}</>}
        </p>
      </div>
    </header>
  );
};
