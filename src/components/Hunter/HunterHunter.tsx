import React from 'react';
import { NextImg } from 'src/components/Img/Img';

type PROPS = {
  heightValue: number;
  widthValue: number;
};

export const HunterHunter: React.VFC<PROPS> = (props) => {
  if (props.heightValue === 0 && props.widthValue === 0) {
    return (
      <NextImg
        class="text-center mb-5"
        src="/images/xgjhaa.webp"
        width="586"
        height="369"></NextImg>
    );
  } else {
    return (
      <NextImg
        class="text-center mb-5"
        src="/images/20170515114123.jpg"
        width="640"
        height="480"></NextImg>
    );
  }
};
