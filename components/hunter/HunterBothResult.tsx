// react
import type { DOMAttributes, VFC } from 'react';
import React from 'react';

type PROPS = {
  widthInputText: string;
  heightInputText: string;
};

export const HunterBothResult: VFC<PROPS> = (props) => {
  return (
    <div className="sm:flex sm:space-x-4 mb-5">
      <div className="border rounded-lg shadow-md w-full bg-blue-100 p-5 mb-4">
        <h3 className="font-bold sm:text-lg text-sm mb-4">
          幅：{props.widthInputText}
          <sub>mm</sub>
        </h3>
        <ul className="list-disc pl-5 break-all">
          <li>
            幅 ÷ 303<sub>mm</sub> ={' '}
            <span className="text-red-600 font-bold">
              {parseFloat(props.widthInputText) / 303}
              <sub>mm</sub>
            </span>
          </li>
          <li>
            幅 ÷ 303<sub>mm</sub> の余り ={' '}
            <span className="text-red-600 font-bold">
              {parseFloat(props.widthInputText) % 303}
              <sub>mm</sub>
            </span>
          </li>
          <li>
            幅 ÷ 303<sub>mm</sub>の余り ÷ 2={' '}
            <span className="text-red-600 font-bold">
              {(parseFloat(props.widthInputText) % 303) / 2}
              <sub>mm</sub>
            </span>
          </li>
        </ul>
      </div>
      <div className="border rounded-lg shadow-md w-full bg-blue-100 p-5 mb-4">
        <h3 className="font-bold sm:text-lg text-sm mb-4">
          高さ：{props.heightInputText}
          <sub>mm</sub>
        </h3>
        <ul className="list-disc pl-5 break-all">
          <li>
            高さ ÷ 1820<sub>mm</sub> ={' '}
            <span className="text-red-600 font-bold">
              {parseFloat(props.heightInputText) / 1820}
              <sub>mm</sub>
            </span>
          </li>
          <li>
            高さ ÷ 1820<sub>mm</sub> の余り ={' '}
            <span className="text-red-600 font-bold">
              {parseFloat(props.heightInputText) % 1820}
              <sub>mm</sub>
            </span>
          </li>
          <li>
            高さ ÷ 1820<sub>mm</sub>の余り ÷ 2={' '}
            <span className="text-red-600 font-bold">
              {(parseFloat(props.heightInputText) % 1820) / 2}
              <sub>mm</sub>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
