import React, { useState, useEffect, useRef } from 'react';
import type { NextPage } from 'next';

import Head from 'next/head';
import Layout from '../../components/layout';

import { TextInput } from '../../components/form/TextInput';
import { HunterList } from '../../components/list/HunterList';

import { Grid } from '@material-ui/core';

type ARG = {
  widthInputText: string | number;
};

export const Index: NextPage<ARG> = () => {
  const pra: any = useRef(null);
  // console.log(pra.current.innerHTML);

  // const onmousedown = (event) => {
  //   document.addEventListener('mousemove', onMouseMove);
  // };
  // var onMouseMove = (event) => {
  //   var x = event.clientX;
  //   var y = event.clientY;
  //   var width = pra.current.offsetWidth;
  //   var height = pra.current.offsetHeight;
  //   pra.current.style.position = 'absolute';
  //   pra.current.style.top = y - height / 2 + 'px';
  //   pra.current.style.left = x - width / 2 + 'px';
  // };

  // 幅と高さを入力するテキストボックス
  const [widthInputText, setWidthInputText] = useState('');
  const [heightInputText, setHeightInputText] = useState('');

  // 計算後の値格納と計算結果を出すフラグ
  const [calcFlag, setCalcFlag] = useState(false);
  const [calcHeightFinish, setCalcFinish] = useState<any>();
  const [calcWidthFinish, setCalcWidthFinish] = useState<any>();

  // 高さと1820を割って1820ボックスの個数をカウント
  const [repeate, setRepate] = useState<any>('');
  const [test, setTest] = useState<any>('');

  //入力テキストを取得
  const widthTextGet = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidthInputText(e.target.value);
  };
  const heightTextGet = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeightInputText(e.target.value);
  };

  //計算式の格納
  let calcHeightTotal = parseFloat(heightInputText) / 1820;
  let calcWidthTotal = parseFloat(widthInputText) / 303;
  let boxNum = parseFloat(heightInputText) / 1820; // ボックスの個数
  let hunterListBoxHeight: any = (1820 / parseFloat(heightInputText)) * 100; // HunterListのボックスの高さ
  let DivisionRemainderValueHeight = parseFloat(heightInputText) % 1820; // 高さにあまりがあるか
  let DivisionRemainderValue: any = 0; // 割ったあまりの数字
  let DivisionByTwoValue: any = 0; // 割ったあまりをさらに割る2した数字
  let divisionRemainderBoxHeightPosition: any = 0;
  let DivisionJust: any = ''; // 割ったあまりが0の場合に入れるテキスト変数
  let divisionRemainderBoxHeight: any = ''; // 各グレーボックスの高さを格納

  let hunterListBoxWidth: any = ''; // HunterListのボックスの幅
  let DivisionRemainderValueWidth = parseFloat(widthInputText) % 303; // 幅にあまりがあるか
  let DivisionByTwoValueWidth: any = 0;
  let divisionRemainderBoxWidthPosition: any = 0;
  let DivisionJustWidth: any = '';

  // 幅に余りがなければ各ボックスの幅は25%
  if (DivisionRemainderValueWidth === 0) {
    hunterListBoxWidth = 25;
    // DivisionByTwoValueWidth = 'ピッタリ';
  } else {
    // hunterListBoxWidth = DivisionRemainderValueWidth / 10;
    hunterListBoxWidth = 25;
    DivisionByTwoValueWidth = DivisionRemainderValueWidth;
  }

  const CalcWidth = (props) => {
    const isCalc: Boolean = props.isCalc;
    return (
      <div className="flex justify-between">
        <p className="text-right text-xs">余りは{DivisionByTwoValueWidth}mm</p>
        <p className="text-right text-xs">
          余りの割る2は{DivisionByTwoValueWidth / 2}mm
        </p>
      </div>
    );
  };

  // 高さを1820で割って余りが0かの判定
  if (DivisionRemainderValueHeight === 0) {
    DivisionRemainderValue = 910;
    DivisionByTwoValue = 910;
  } else {
    DivisionRemainderValue = DivisionRemainderValueHeight;
    DivisionByTwoValue = DivisionRemainderValue / 2;
  }

  //入力テキストの割り算
  const Calc = (props) => {
    const isInput: Boolean = props.isInput;
    if (widthInputText !== '' && heightInputText !== '') {
      useEffect(() => {
        setCalcFlag(true);
        setCalcFinish(calcHeightTotal);
        setCalcWidthFinish(calcWidthTotal);
      }, []);
      return <div className="mt-5"></div>;
    } else {
      useEffect(() => {
        setCalcFlag(false);
      }, []);
      return <div className="mt-5"></div>;
    }
  };

  // styles
  const hunterListStyles: any = {
    height: `${parseFloat(hunterListBoxHeight)}%`,
  };
  const divisionResultStyles: any = {
    height: `${parseFloat(hunterListBoxHeight)}%`,
  };

  // 計算後のボックス生成
  const ShowBord = (props) => {
    const isShow: Boolean = props.isShow;
    const isTextHidden: Boolean = props.isTextHidden;
    if (isShow) {
      useEffect(() => {
        setRepate(boxNum);
      }, []);

      const createElem: any = [];
      for (let i = 0; i < repeate; i++) {
        createElem.push(i);
      }

      let elem = '';
      if (DivisionRemainderValue % 910 === 0) {
        DivisionJust = '1820mmピッタリ';
        elem = `<span class="block text-center text-black w-full" style="height: ${divisionResultStyles.height}">${DivisionJust}</span>`;
      } else {
        elem = `<span class="block text-center text-black w-full" style="height: ${
          divisionResultStyles.height
        }%">埋められるのは${DivisionRemainderValue}mm</span>
        <span class="block text-center text-black w-full"
        }%">余るのは${1820 - DivisionRemainderValue}mm</span>`;
      }

      return createElem.map((i, index) => {
        // if (i % 2 === 0 && i === createElem.length - 1) {
        if (isTextHidden) {
          return (
            <HunterList
              key={i}
              class="w-full flex items-start justify-center text-white text-xs border border-solid border-blue-600 bg-gray-200 bg-opacity-60"
              style={hunterListStyles}></HunterList>
          );
        }
        if (i === createElem.length - 1) {
          return (
            <HunterList
              key={i}
              class="w-full flex flex-col items-start justify-start text-white text-xs border border-solid border-blue-600 bg-white bg-opacity-60"
              style={hunterListStyles}
              innerHTML={{ __html: elem }}></HunterList>
          );
        } else {
          return (
            <HunterList
              key={i}
              class="w-full flex items-start justify-center text-white text-xs border border-solid border-blue-600 bg-gray-200 bg-opacity-60"
              style={hunterListStyles}></HunterList>
          );
        }
      });
    } else {
      return <HunterList></HunterList>;
    }
  };

  let ststs: any = '';
  //1820で割り切れるかの判定
  if (DivisionRemainderValue !== 910) {
    ststs = (1820 - DivisionRemainderValue) / 2;
    divisionRemainderBoxHeight = ((DivisionRemainderValue / 1820) * 100) / 2;
    if (repeate >= 2) {
      divisionRemainderBoxHeight =
        ((DivisionRemainderValue / 1820) * 100) / 2 / 2 / 2;
    }
  } else {
    ststs = 910;
    divisionRemainderBoxHeight = 100 / repeate / 2;
    // divisionRemainderBoxHeight = (1820 - DivisionRemainderValue) / 2;
  }
  // console.log('DivisionRemainderValue:', DivisionRemainderValue);
  // console.log('divisionRemainderBoxHeight:', divisionRemainderBoxHeight);

  //余りがある場合の処理
  const DivisionRemainder = (props) => {
    const isShow: Boolean = props.isShow;
    if (isShow) {
      return (
        <>
          <span
            className="bg-white flex items-center justify-center absolute text-xs text-center w-full"
            style={{
              height: `${divisionRemainderBoxHeight}%`,
              top: `-${divisionRemainderBoxHeight}%`,
            }}>
            ここは{ststs}mm
          </span>
          <span
            className="bg-white flex items-center justify-center absolute text-xs text-center w-full"
            style={{
              height: `${divisionRemainderBoxHeight}%`,
              bottom: `${divisionRemainderBoxHeight}%`,
            }}>
            ここは{ststs}mm
          </span>
        </>
      );
    } else {
      return <span></span>;
    }
  };

  // 余りがある場合の幅の処理
  if (DivisionRemainderValueWidth === 0 && DivisionRemainderValueHeight === 0) {
    hunterListBoxWidth = 25;
    divisionRemainderBoxWidthPosition = 0;
    divisionRemainderBoxHeightPosition = 0;
  } else if (DivisionRemainderValueWidth !== 0) {
    divisionRemainderBoxWidthPosition = 5;
  } else {
    divisionRemainderBoxHeightPosition = 5;
  }

  return (
    <Layout home={false}>
      <Head>
        <title>ハンターハンター</title>
      </Head>
      <section className="pb-20 mb-28 overflow-y-auto">
        <CalcWidth isCalc={true} />
        <div className="relative flex h-80 border-2 border-solid border-gray-500">
          <div
            className="h-full w-3/12 absolute"
            style={{
              width: `${hunterListBoxWidth}%`,
              left: `-${divisionRemainderBoxWidthPosition}%`,
            }}>
            <ShowBord isShow={calcFlag} />
          </div>
          <div
            className="h-full w-3/12 absolute left-1/4"
            style={{
              width: `${hunterListBoxWidth}%`,
              top: `${divisionRemainderBoxHeight}%`,
              left: `${
                hunterListBoxWidth - divisionRemainderBoxWidthPosition
              }%`,
            }}>
            <ShowBord isShow={calcFlag} isTextHidden={true} />
            <DivisionRemainder isShow={calcFlag} />
          </div>
          <div
            className="h-full w-3/12 absolute top-0 left-2/4"
            style={{
              width: `${hunterListBoxWidth}%`,
              left: `${
                hunterListBoxWidth * 2 - divisionRemainderBoxWidthPosition
              }%`,
            }}>
            <ShowBord isShow={calcFlag} />
          </div>
          <div
            className="h-full w-3/12 absolute left-3/4"
            style={{
              width: `${hunterListBoxWidth}%`,
              top: `${divisionRemainderBoxHeight}%`,
              left: `${
                hunterListBoxWidth * 3 - divisionRemainderBoxWidthPosition
              }%`,
            }}>
            <ShowBord isShow={calcFlag} isTextHidden={true} />
            <DivisionRemainder isShow={calcFlag} />
          </div>
        </div>
      </section>
      <div className="flex space-x-4 mb-5">
        <TextInput
          label="幅(mm)"
          variant="outlined"
          onChange={widthTextGet}
          value={widthInputText}
        />
        <TextInput
          label="高さ(mm)"
          variant="outlined"
          onChange={heightTextGet}
          value={heightInputText}
        />
      </div>
      <div className="sm:flex sm:space-x-4 mb-5">
        <div className="border rounded-lg shadow-md w-full bg-blue-100 p-5 mb-4">
          <h3 className="font-bold sm:text-lg text-sm mb-4">
            幅<sub>mm</sub>：{widthInputText}
            <sub>mm</sub>
          </h3>
          <ul className="list-disc pl-5 break-all">
            <li>
              幅 ÷ 303<sub>mm</sub> = {parseFloat(widthInputText) / 303}
              <sub>mm</sub>
            </li>
            <li>
              幅 ÷ 303<sub>mm</sub> の余り = {parseFloat(widthInputText) % 303}
              <sub>mm</sub>
            </li>
            <li>
              幅 ÷ 303<sub>mm</sub>の余り ÷ 2={' '}
              {(parseFloat(widthInputText) % 303) / 2}
              <sub>mm</sub>
            </li>
          </ul>
        </div>
        <div className="border rounded-lg shadow-md w-full bg-blue-100 p-5 mb-4">
          <h3 className="font-bold sm:text-lg text-sm mb-4">
            高さ<sub>mm</sub>：{heightInputText}
            <sub>mm</sub>
          </h3>
          <ul className="list-disc pl-5 break-all">
            <li>
              高さ ÷ 1820<sub>mm</sub> = {parseFloat(heightInputText) / 1820}
              <sub>mm</sub>
            </li>
            <li>
              高さ ÷ 1820<sub>mm</sub> の余り ={' '}
              {parseFloat(heightInputText) % 1820}
              <sub>mm</sub>
            </li>
            <li>
              高さ ÷ 1820<sub>mm</sub>の余り ÷ 2={' '}
              {(parseFloat(heightInputText) % 1820) / 2}
              <sub>mm</sub>
            </li>
          </ul>
        </div>
        {/* <Grid container spacing={3}>
          <Grid className="border rounded-lg shadow-md" item xs={6}></Grid>
          <Grid className="border rounded-lg shadow-md" item xs={6}></Grid>
        </Grid> */}
      </div>
      {/* <p onMouseMove={onmousedown} ref={pra}> */}
      <Calc isInput={calcFlag} />
    </Layout>
  );
};

export default Index;
