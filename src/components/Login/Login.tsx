import React from 'react';
import { BtnLogin } from '@/components/Button/BtnLogin';
import { NextImg } from '@/components/Img/Img';
import { handleLogIn } from '@/components/Firebase/FirebaseAuth';

type PROPS = {
  click: React.MouseEventHandler<HTMLElement>;
};

export const LoginGoogle: React.VFC<PROPS> = (props) => {
  return (
    <div onClick={props.click}>
      <BtnLogin
        link={false}
        class="bg-white py-0 px-0 max-w-full w-full md:hover:opacity-80"
        click={handleLogIn}>
        <NextImg
          class="leading-none"
          src="/images/login/login_google.png"
          alt=""
          width="382"
          height="92"
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

export const LoginYahoo = () => {
  return (
    <BtnLogin
      link={false}
      class="bg-white py-0 px-0 max-w-full w-full md:hover:opacity-80">
      yahooを追加予定
    </BtnLogin>
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
