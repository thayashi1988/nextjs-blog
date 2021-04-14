import React, { useState, useRef } from 'react';
import type { NextPage } from 'next';

import Head from 'next/head';
import Layout from '../../components/layout';

import { TextInput } from '../../components/hunter/HunterTextInput';
import { HunterList } from '../../components/hunter/HunterList';
import { HunterListWrap } from '../../components/hunter/HunterListWrap';
import { HunterWidthResult } from '../../components/hunter/HunterWidthResult';
import { HunterBothResult } from '../../components/hunter/HunterBothResult';
import { HunterEvenRows } from '../../components/hunter/HunterEvenRows';

// interface VARIABLE{
//   widthInputText: number;
//   heightInputText: number;
//   grayBoxNum: number;
//   hunterListBoxHeight: any;
//   divisionRemainderHeightValue: string | number;
// };

export const Index: NextPage = () => {
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

  //////// useState  ////////
  // 幅と高さを入力するテキストボックス
  const [widthInputText, setWidthInputText] = useState<string>('');
  const [heightInputText, setHeightInputText] = useState<string>('');

  //入力テキストを取得
  const widthTextGet = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidthInputText(e.target.value);
  };
  const heightTextGet = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeightInputText(e.target.value);
  };

  // 各変数
  const grayBoxNum: number = parseFloat(heightInputText) / 1820; // ボックスの個数
  const hunterListBoxHeight: any = (1820 / parseFloat(heightInputText)) * 100; // HunterListのボックスの高さ
  const divisionRemainderHeight: number = parseFloat(heightInputText) % 1820; // 高さにあまりがあるか
  let divisionRemainderHeightValue: number = 0; // 割ったあまりの数字
  let divisionJustText: string = ''; // 割ったあまりが0の場合に入れるテキスト変数
  let divisionRemainderBoxHeightandTopPosition: string | number = ''; // 各余りテキストの高さとTOPポジションの高さを格納

  let hunterListWrapBoxWidth: any = '25'; // HunterListの親ボックスの幅
  const divisionRemainderWidth: number = parseFloat(widthInputText) % 303; // 幅にあまりがあるか
  let divisionRemainderWidthValue: number = divisionRemainderWidth; // 割ったあまりの数字
  let divisionRemainderBoxWidthPosition: number = 0;

  let divisionRemaindertext: string = '';
  let divisionRemainderHeightValueText: string | number = '';
  let simulationFlag: boolean = false;

  if (widthInputText !== '' && heightInputText !== '') {
    simulationFlag = true;
  }

  //////// styles  ////////
  const hunterListStyles: any = {
    height: `${parseFloat(hunterListBoxHeight)}%`,
  };
  const divisionResultStyles: any = {
    height: `${parseFloat(hunterListBoxHeight)}%`,
  };

  // 入力した高さを1820で割って余りがあるか
  if (divisionRemainderHeight === 0) {
    //余りがなければ、2列目以降にずらす1820の半分の910を格納
    divisionRemainderHeightValue = 910;
  } else {
    //余りがあれば、parseFloat(heightInputText) % 1820で余りを格納
    divisionRemainderHeightValue = divisionRemainderHeight;
  }

  // HunterListボックス生成
  const ShowHunterList = (props) => {
    const isShow: Boolean = props.isShow;
    const isTextHidden: Boolean = props.isTextHidden;
    if (isShow) {
      // (parseFloat(heightInputText) / 1820)で割れた数だけhunterlistボックス生成を生成
      const hunterListCreateElem: any = [];
      for (let i = 0; i < grayBoxNum; i++) {
        hunterListCreateElem.push(i);
      }

      // 高さの余りが910で割り切れれば、1820の倍数なのでピッタリ
      if (divisionRemainderHeightValue % 910 === 0) {
        divisionJustText = '1820mmピッタリ';
        divisionRemaindertext = `<span class="block text-center text-black w-full" style="height: ${divisionResultStyles.height}">${divisionJustText}</span>`;
      } else {
        //割り切れなければ、余りを表示と「1820 - 余り」を表示
        divisionRemaindertext = `<span class="block text-center text-black w-full" style="height: ${
          divisionResultStyles.height
        }%">埋められるのは${divisionRemainderHeightValue}mm</span>
        <span class="block text-center text-black w-full"
        }%">余るのは${1820 - divisionRemainderHeightValue}mm</span>`;
      }

      return hunterListCreateElem.map((i: React.Key) => {
        // 偶数列は余りのテキストを出さない処理
        if (isTextHidden) {
          return (
            <HunterList
              key={i}
              class="w-full flex items-start justify-center text-white text-xs border border-solid border-blue-600 bg-gray-200 bg-opacity-60"
              style={hunterListStyles}></HunterList>
          );
        }

        // HunterListの最後のボックスであれば余りのテキストを表示
        if (i === hunterListCreateElem.length - 1) {
          return (
            <HunterList
              key={i}
              class="w-full flex flex-col items-start justify-start text-white text-xs border border-solid border-blue-600 bg-white bg-opacity-60"
              style={hunterListStyles}
              innerHTML={{ __html: divisionRemaindertext }}></HunterList>
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

  // 高さの余りが910でなければ
  if (divisionRemainderHeightValue !== 910) {
    divisionRemainderHeightValueText =
      (1820 - divisionRemainderHeightValue) * 2;
    divisionRemainderBoxHeightandTopPosition =
      ((divisionRemainderHeightValue / 1820) * 100) / 2;
    // 2列目以降の高さをさらに2で割りサイズ感を出す
    if (grayBoxNum >= 2) {
      divisionRemainderBoxHeightandTopPosition =
        ((divisionRemainderHeightValue / 1820) * 100) / 2 / 2 / 2;
    }
  } else {
    divisionRemainderHeightValueText = 910;
    divisionRemainderBoxHeightandTopPosition = 100 / grayBoxNum / 2;
  }

  // 幅に余りがあれば、leftをマイナス5%にして左にずらす
  if (divisionRemainderWidth !== 0) {
    divisionRemainderBoxWidthPosition = 5;
  } else {
    divisionRemainderBoxWidthPosition = 0;
  }

  return (
    <Layout home={false}>
      <Head>
        <title>ハンターハンター</title>
      </Head>
      <section className="pb-20 mb-28 overflow-y-auto">
        <HunterWidthResult
          divisionRemainderWidthValue={divisionRemainderWidthValue}
        />
        <div className="relative flex h-80 border-2 border-solid border-gray-500">
          {/* <HunterListWrap
            classPositionLeft="left-1/4"
            styleWidth={hunterListWrapBoxWidth}
            styleTop="0"
            styleLeft={divisionRemainderBoxWidthPosition}>
            <ShowHunterList isShow={simulationFlag} />
            <HunterEvenRows
              styleHeightandTop={divisionRemainderBoxHeightandTopPosition}
              text={divisionRemainderHeightValueText}
              isShow={simulationFlag}
            />
          </HunterListWrap> */}
          <div
            className="h-full w-3/12 absolute"
            style={{
              width: `${hunterListWrapBoxWidth}%`,
              left: `-${divisionRemainderBoxWidthPosition}%`,
            }}>
            <ShowHunterList isShow={simulationFlag} />
          </div>
          <div
            className="h-full w-3/12 absolute left-1/4"
            style={{
              width: `${hunterListWrapBoxWidth}%`,
              top: `${divisionRemainderBoxHeightandTopPosition}%`,
              left: `${
                hunterListWrapBoxWidth - divisionRemainderBoxWidthPosition
              }%`,
            }}>
            <ShowHunterList isShow={simulationFlag} isTextHidden={true} />
            <HunterEvenRows
              styleHeightandTop={divisionRemainderBoxHeightandTopPosition}
              text={divisionRemainderHeightValueText}
              isShow={simulationFlag}
            />
          </div>
          <div
            className="h-full w-3/12 absolute top-0 left-2/4"
            style={{
              width: `${hunterListWrapBoxWidth}%`,
              left: `${
                hunterListWrapBoxWidth * 2 - divisionRemainderBoxWidthPosition
              }%`,
            }}>
            <ShowHunterList isShow={simulationFlag} />
          </div>
          <div
            className="h-full w-3/12 absolute left-3/4"
            style={{
              width: `${hunterListWrapBoxWidth}%`,
              top: `${divisionRemainderBoxHeightandTopPosition}%`,
              left: `${
                hunterListWrapBoxWidth * 3 - divisionRemainderBoxWidthPosition
              }%`,
            }}>
            <ShowHunterList isShow={simulationFlag} isTextHidden={true} />
            <HunterEvenRows
              styleHeightandTop={divisionRemainderBoxHeightandTopPosition}
              text={divisionRemainderHeightValueText}
              isShow={simulationFlag}
            />
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
      <HunterBothResult
        widthInputText={widthInputText}
        heightInputText={heightInputText}
      />
    </Layout>
  );
};

export default Index;
