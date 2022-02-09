import React from 'react';

type PROPS = {
  widthInputText: string;
  heightInputText: string;
};

// type SETTINGBORDNUM = {
//   inputNum: string | number;
//   type: string;
// };

const settingBordNum = (inputNum: any, type: string): number => {
  const widthConst: number = 303;
  const heightConst: number = 1820;
  if (type === 'width') {
    return Math.floor(inputNum / widthConst);
  } else {
    return Math.floor(inputNum / heightConst);
  }
};

export const HunterBothResult: React.VFC<PROPS> = (props) => {
  const displayWidthNum =
    props.widthInputText === '' ? '0' : props.widthInputText;
  const displayHeightNum =
    props.heightInputText === '' ? '0' : props.heightInputText;
  console.log('displayWidthNum:', displayWidthNum);
  return (
    <div className="sm:flex sm:space-x-4 mb-5">
      <div className="border rounded-lg shadow-md w-full bg-blue-100 p-5 mb-4 dark:text-black">
        <h3 className="font-bold sm:text-lg text-sm mb-4 break-all">
          幅：{displayWidthNum}
          <sub>mm</sub>
        </h3>
        <ul className="list-disc pl-5 break-all">
          <li>
            幅 ÷ 303<sub>mm</sub> ={' '}
            <span className="text-red-600 font-bold">
              {settingBordNum(displayWidthNum, 'width')}
              枚の板を置けるよ
            </span>
          </li>
          <li>
            幅 ÷ 303<sub>mm</sub> の余り ={' '}
            <span className="text-red-600 font-bold">
              {parseFloat(displayWidthNum) % 303}
              <sub>mm</sub>
            </span>
          </li>
          <li>
            幅 ÷ 303<sub>mm</sub>の余り ÷ 2={' '}
            <span className="text-red-600 font-bold">
              {(parseFloat(displayWidthNum) % 303) / 2}
              <sub>mm</sub>
            </span>
          </li>
        </ul>
      </div>
      <div className="border rounded-lg shadow-md w-full bg-blue-100 p-5 mb-4 dark:text-black">
        <h3 className="font-bold sm:text-lg text-sm mb-4 break-all">
          高さ：{displayHeightNum}
          <sub>mm</sub>
        </h3>
        <ul className="list-disc pl-5 break-all">
          <li>
            高さ ÷ 1820<sub>mm</sub> ={' '}
            <span className="text-red-600 font-bold">
              {settingBordNum(displayHeightNum, 'height')}
              枚の板を置けるよ
            </span>
          </li>
          <li>
            高さ ÷ 1820<sub>mm</sub> の余り ={' '}
            <span className="text-red-600 font-bold">
              {parseFloat(displayHeightNum) % 1820}
              <sub>mm</sub>
            </span>
          </li>
          <li>
            高さ ÷ 1820<sub>mm</sub>の余り ÷ 2={' '}
            <span className="text-red-600 font-bold">
              {(parseFloat(displayHeightNum) % 1820) / 2}
              <sub>mm</sub>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
