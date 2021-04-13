import React, { useState, useEffect, useRef } from 'react';
import type { NextPage } from 'next';

import Head from 'next/head';
import Layout from '../../components/layout';

import classes from './hunter.module.css';
import { TextInput } from '../../components/form/TextInput';
import { HunterList } from '../../components/list/HunterList';

type ARG = {
  widthInputText: string | number;
};

export const Index: NextPage<ARG> = () => {
  const box = useRef<HTMLDivElement | null>(null);

  //幅と高さのテキストボックス
  const [widthInputText, setWidthInputText] = useState('');
  const [heightInputText, setHeightInputText] = useState('');

  //計算後の値格納と計算フラグ
  const [calcFlag, setCalcFlag] = useState(false);
  const [calcFinish, setCalcFinish] = useState<any>();

  //???
  const [repeate, setRepate] = useState<any>('');

  //入力テキストを取得
  const widthTextGet = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidthInputText(e.target.value);
  };
  const heightTextGet = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeightInputText(e.target.value);
  };

  //計算式の格納
  let calcTotal = parseFloat(heightInputText) / 1820;
  let boxNum = parseFloat(heightInputText) / 1820;
  let boxHeight = (1820 / parseFloat(heightInputText)) * 100;
  let DivisionValue = 0;
  let postionTop = 100 / repeate;

  if ((parseFloat(heightInputText) % 1820) / 2 === 0) {
    DivisionValue = 910;
  } else {
    DivisionValue = (parseFloat(heightInputText) % 1820) / 2;
  }

  //入力テキストの割り算
  const Calc = (props) => {
    const isInput: Boolean = props.isInput;
    if (widthInputText !== '' && heightInputText !== '') {
      useEffect(() => {
        setCalcFlag(true);
        setCalcFinish(calcTotal);
        // setCalcFinish(parseFloat(heightInputText) / 1820);
        // setCalcFinish(1820 / parseFloat(heightInputText));
      }, []);
      // if (1820 % parseFloat(calcFinish) === 0) {
      //   console.log('1820 % calcFinish:', 1820 % parseFloat(calcFinish));
      // }
      return <p>1820で高さを割ると・・・答え：{calcFinish}</p>;
    } else {
      useEffect(() => {
        setCalcFlag(false);
      }, []);
      return <p>1820で高さを割ると・・・：</p>;
    }
  };

  // styles
  const styles = {
    width: '100%',
    height: `${boxHeight}%`,
    // height: `${(1820 / parseFloat(heightInputText)) * 100}%`,
    backgroundColor: 'rgba(0,0,0,.2)',
    borderRight: '1px solid rgba(59, 130, 246, 1)',
    borderTop: '1px solid rgba(59, 130, 246, 1)',
  };

  // 計算後のボックス生成
  const ShowBord = (props) => {
    const isShow: Boolean = props.isShow;
    if (isShow) {
      useEffect(() => {
        console.log('boxNum:', (boxNum % 2) * 100);
        setRepate(boxNum);

        // setRepate(parseFloat(heightInputText) / 1820);
      }, []);

      const createElem: any = [];
      for (let i = 0; i < repeate; i++) {
        createElem.push(i);
      }

      let test = '';
      if (true) {
        test = `<span class="block text-center w-full" style="height: ${
          100 - boxHeight
        }%">${DivisionValue * 2}mm</span>`;
      }

      return createElem.map((i) => {
        if (i % 2 === 0) {
          return (
            <HunterList
              key={i}
              class="flex items-center justify-center text-xs"
              style={styles}></HunterList>
          );
        } else {
          return (
            <HunterList
              key={i}
              class="flex items-start justify-center text-xs"
              style={styles}
              innerHTML={{ __html: test }}>
              {/* <span>{DivisionValue * 2}mm</span> */}
              {/* {(parseFloat(heightInputText) % 1820) / 2}の板 */}
            </HunterList>
          );
        }
      });
    } else {
      return <HunterList></HunterList>;
    }
  };

  let divisionRemainderStyles: any = '';
  if (DivisionValue !== 910) {
    divisionRemainderStyles = (100 - boxHeight) / 2;
  } else {
    divisionRemainderStyles = 100 / repeate / 2;
  }

  //余りがある場合の処理
  const DivisionRemainder = (props) => {
    const isShow: Boolean = props.isShow;
    console.log('divisionRemainderStyles:', divisionRemainderStyles);
    if (isShow) {
      return (
        <>
          <span
            className="bg-white flex items-center justify-center absolute text-xs text-center w-full"
            style={{
              height: `${divisionRemainderStyles}%`,
              // height: `${100 / repeate / 2}%`,
              top: `-${divisionRemainderStyles}%`,
              // top: `-${100 / repeate / 2}%`,
            }}>
            ここは{DivisionValue}mm
          </span>
          <span
            className="bg-white flex items-center justify-center absolute text-xs text-center w-full"
            style={{
              height: `${divisionRemainderStyles}%`,
              // height: `${100 / repeate / 2}%`,
              bottom: `${divisionRemainderStyles}%`,
            }}>
            ここは{DivisionValue}mm
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
      <section className={classes.section}>
        <div className={classes.box}>
          <div className="h-full">
            <ShowBord isShow={calcFlag} />
            {/* {parseFloat(heightInputText) % 1820}mm */}
            {/* <DivisionRemainder isShow={calcFlag} /> */}
          </div>
          <div
            className="h-full absolute left-1/4"
            style={{
              // top: `${100 / repeate / 2}%`,
              top: `${divisionRemainderStyles}%`,
            }}>
            <ShowBord isShow={calcFlag} />
            <DivisionRemainder isShow={calcFlag} />
          </div>
          <div className="h-full absolute top-0 left-2/4" style={{}}>
            <ShowBord isShow={calcFlag} />
            {/* <DivisionRemainder isShow={calcFlag} /> */}
          </div>
          <div
            className="h-full absolute left-3/4"
            style={{
              top: `${divisionRemainderStyles}%`,
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
