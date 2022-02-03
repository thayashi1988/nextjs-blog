import React from 'react';
import { BtnSimple } from 'src/components/Button/BtnSimple';
import { NextImg } from '@/components/Img/Img';
import { handleLogIn } from '@/components/Firebase/FirebaseAuth';

export const LoginGoogle = () => {
  return (
    <BtnSimple
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
    </BtnSimple>
  );
};

export const LoginFacebook = () => {
  return (
    <BtnSimple
      link={false}
      class="bg-white py-0 px-0 max-w-full w-full md:hover:opacity-80">
      Facebookを追加予定
    </BtnSimple>
  );
};

export const LoginYahoo = () => {
  return (
    <BtnSimple
      link={false}
      class="bg-white py-0 px-0 max-w-full w-full md:hover:opacity-80">
      yahooを追加予定
    </BtnSimple>
  );
};

export const LoginGithub = () => {
  return (
    <BtnSimple
      link={false}
      class="bg-white py-0 px-0 max-w-full w-full md:hover:opacity-80">
      githubを追加予定
    </BtnSimple>
  );
};
