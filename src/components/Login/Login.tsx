import React from 'react';
import { BtnLogin } from '@/components/Button/BtnLogin';
import { NextImg } from '@/components/Img/Img';
import { handleLogIn } from '@/components/Firebase/FirebaseAuth';

type PROPS = {
  click: React.MouseEventHandler<HTMLElement>;
};

export const LoginGoogle: React.VFC<PROPS> = (props) => {
  return (
    <div onClick={props.click} className="max-w-[191px] mx-auto">
      <BtnLogin
        link={false}
        class="bg-white py-0 px-0 max-w-full w-full md:hover:opacity-80 h-[46px]"
        click={handleLogIn}>
        <NextImg
          class="inline-block"
          src="/images/login/login_google.png"
          alt=""
          width="191"
          height="46"
        />
      </BtnLogin>
    </div>
  );
};

export const LoginFacebook = () => {
  return (
    <BtnLogin
      link={false}
      class="bg-white py-0 px-0 max-w-full w-full md:hover:opacity-80">
      Facebookを追加予定
    </BtnLogin>
  );
};

export const LoginYahoo = (props) => {
  return (
    <div onClick={props.click} className="max-w-[191px] mx-auto">
      <BtnLogin
        link={false}
        class="p-2 w-full md:hover:opacity-80 bg-[#ff0033] flex items-center rounded mx-auto">
        <NextImg
          class="inline-block"
          src="/images/login/login_yahoo.png"
          alt=""
          width="32"
          height="18"
        />
        <span className="text-white font-bold text-[14px] inline-block w-[75%]">
          ログイン
        </span>
      </BtnLogin>
    </div>
  );
};

export const LoginGithub = () => {
  return (
    <BtnLogin
      link={false}
      class="bg-white py-0 px-0 max-w-full w-full md:hover:opacity-80">
      githubを追加予定
    </BtnLogin>
  );
};
