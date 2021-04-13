import React, { useState, useEffect, useRef } from 'react';
import type { NextPage } from 'next';

import Head from 'next/head';
import Layout from '../../components/layout';

import { TextInput } from '../../components/form/TextInput';
import { HunterList } from '../../components/list/HunterList';

type ARG = {
  widthInputText: string | number;
};

export const Index: NextPage<ARG> = () => {
  const box = useRef<HTMLDivElement | null>(null);

  // 幅と高さを入力するテキストボックス
  const [widthInputText, setWidthInputText] = useState('');
  const [heightInputText, setHeightInputText] = useState('');

  // 計算後の値格納と計算結果を出すフラグ
  const [calcFlag, setCalcFlag] = useState(false);
  const [calcFinish, setCalcFinish] = useState<any>();

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
  let calcTotal = parseFloat(heightInputText) / 1820;
  let boxNum = parseFloat(heightInputText) / 1820; // ボックスの個数
  let hunterListBoxHeight: any = (1820 / parseFloat(heightInputText)) * 100; // ボックスの高さ
  let DivisionRemainderValue: any = 0; // 割ったあまりの数字
  let DivisionByTwoValue: any = 0; // 割ったあまりをさらに割る2数字
  let DivisionJust: any = ''; // 割ったあまりをさらに割る2数字
  let divisionRemainderBoxHeight: any = ''; // 各ボックスの高さを格納

  // 高さを1820で割って余りが0かの判定
  if ((parseFloat(heightInputText) % 1820) / 2 === 0) {
    DivisionRemainderValue = 910;
    DivisionByTwoValue = 910;
  } else {
    DivisionRemainderValue = parseFloat(heightInputText) % 1820;
    DivisionByTwoValue = DivisionRemainderValue / 2;
  }
  // console.log('DivisionRemainderValue:', DivisionRemainderValue);

  //入力テキストの割り算
  const Calc = (props) => {
    const isInput: Boolean = props.isInput;
    if (widthInputText !== '' && heightInputText !== '') {
      useEffect(() => {
        setCalcFlag(true);
        setCalcFinish(calcTotal);
      }, []);
      return <p>1820で高さを割ると・・・答え：{calcFinish}</p>;
    } else {
      useEffect(() => {
        setCalcFlag(false);
      }, []);
      return <p>1820で高さを割ると・・・：</p>;
    }
  };

  // styles
  let styles: any = {
    height: `${parseFloat(hunterListBoxHeight)}%`,
  };

  // 計算後のボックス生成
  const ShowBord = (props) => {
    const isShow: Boolean = props.isShow;
    if (isShow) {
      useEffect(() => {
        setRepate(boxNum);
        console.log('repeate:', parseInt(repeate));
      }, []);

      const createElem: any = [];
      for (let i = 0; i < repeate; i++) {
        createElem.push(i);
      }

      let elem = '';
      if (DivisionRemainderValue % 910 === 0) {
        DivisionJust = '1820mmピッタリ';
        elem = `<span class="block text-center text-black w-full" style="height: ${
          (DivisionRemainderValue / 1820) * 100
        }%">${DivisionJust}</span>`;
      } else {
        elem = `<span class="block text-center text-black w-full" style="height: ${
          (DivisionRemainderValue / 1820) * 100
        }%">埋められるのは${DivisionRemainderValue}mm</span>`;
      }

      return createElem.map((i, index) => {
        // if (i % 2 === 0 && i === createElem.length - 1) {
        if (i === createElem.length - 1) {
          return (
            <HunterList
              key={i}
              class="w-full flex items-start justify-center text-white text-xs border border-solid border-blue-600 bg-gray-300 bg-opacity-60"
              style={styles}
              innerHTML={{ __html: elem }}></HunterList>
          );
        } else {
          return (
            <HunterList
              key={i}
              class="w-full flex items-start justify-center text-white text-xs border border-solid border-blue-600 bg-gray-300 bg-opacity-60"
              style={styles}></HunterList>
          );
        }
      });
    } else {
      return <HunterList></HunterList>;
    }
  };

  //1820で割り切れるかの判定
  if (DivisionRemainderValue !== 910) {
    divisionRemainderBoxHeight = ((DivisionRemainderValue / 1820) * 100) / 2;
    if (repeate >= 2) {
      divisionRemainderBoxHeight =
        ((DivisionRemainderValue / 1820) * 100) / 2 / 2 / 2;
    }
  } else {
    divisionRemainderBoxHeight = 100 / repeate / 2;
  }
  console.log('DivisionRemainderValue:', DivisionRemainderValue);
  console.log('divisionRemainderBoxHeight:', divisionRemainderBoxHeight);

  //余りがある場合の処理
  const DivisionRemainder = (props) => {
    const isShow: Boolean = props.isShow;
    if (isShow) {
      return (
        <>
          <span
            className="bg-white bg-blue-300 flex items-center justify-center absolute text-xs text-center w-full"
            style={{
              height: `${divisionRemainderBoxHeight}%`,
              top: `-${divisionRemainderBoxHeight}%`,
            }}>
            ここは{DivisionByTwoValue}mm
          </span>
          <span
            className="bg-white bg-blue-300 flex items-center justify-center absolute text-xs text-center w-full"
            style={{
              height: `${divisionRemainderBoxHeight}%`,
              bottom: `${divisionRemainderBoxHeight}%`,
            }}>
            ここは{DivisionByTwoValue}mm
          </span>
        </>
      );
    } else {
      return <span></span>;
    }
  };

  return (
    <Layout home={false}>
      <Head>
        <title>ハンターハンター</title>
      </Head>
      <section className="pb-20 mb-28 overflow-hidden">
        <div className="relative flex h-80 border-2 border-solid border-gray-500">
          <div className="h-full w-3/12">
            <ShowBord isShow={calcFlag} />
          </div>
          <div
            className="h-full w-3/12 absolute left-1/4"
            style={{
              top: `${divisionRemainderBoxHeight}%`,
            }}>
            <ShowBord isShow={calcFlag} />
            <DivisionRemainder isShow={calcFlag} />
          </div>
          <div className="h-full w-3/12 absolute top-0 left-2/4">
            <ShowBord isShow={calcFlag} />
          </div>
          <div
            className="h-full w-3/12 absolute left-3/4"
            style={{
              top: `${divisionRemainderBoxHeight}%`,
            }}>
            <ShowBord isShow={calcFlag} />
            <DivisionRemainder isShow={calcFlag} />
          </div>
        </div>
      </section>
      <div className="flex space-x-4 mb-5">
        <TextInput
          label="幅"
          variant="outlined"
          onChange={widthTextGet}
          value={widthInputText}
        />
        <TextInput
          label="高さ"
          variant="outlined"
          onChange={heightTextGet}
          value={heightInputText}
        />
      </div>
      <p>幅：{widthInputText}</p>
      <p>高さ：{heightInputText}</p>
      <Calc isInput={calcFlag} />
    </Layout>
  );
};

export default Index;
