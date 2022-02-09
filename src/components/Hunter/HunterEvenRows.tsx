import React from 'react';

type PROPS = {
  isShow: boolean;
  styleHeightandTop: string | number;
  text: string | number;
};

export const HunterEvenRows: React.VFC<PROPS> = (props) => {
  let styles = '';
  let flag = props.isShow;
  if (flag) {
    styles = 'block';
  } else {
    styles = 'none';
  }
  return (
    <div style={{ display: styles }}>
      <span
        className="bg-white flex items-center justify-center absolute text-black text-xs text-center w-full"
        style={{
          height: `${props.styleHeightandTop}%`,
          top: `-${props.styleHeightandTop}%`,
        }}>
        ここは{props.text}mm
      </span>
      <span
        className="bg-white flex items-center justify-center absolute text-black text-xs text-center w-full"
        style={{
          height: `${props.styleHeightandTop}%`,
          bottom: `${props.styleHeightandTop}%`,
        }}>
        ここは{props.text}mm
      </span>
    </div>
  );
};
