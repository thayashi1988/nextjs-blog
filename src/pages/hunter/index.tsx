import React, { useState } from 'react';
import type { NextPage } from 'next';
import { renderToString } from 'react-dom/server';
import {
  DragDropContext,
  Droppable,
  Draggable,
  resetServerContext,
} from 'react-beautiful-dnd';
import Head from 'next/head';
import { Text } from '@/components/Text/Text';
import { Heading1 } from '@/components/Heading/Heading1';
import { TextInput } from 'src/components/Hunter/HunterTextInput';
import { HunterList } from 'src/components/Hunter/HunterList';
import { HunterWidthResult } from 'src/components/Hunter/HunterWidthResult';
import { HunterBothResult } from 'src/components/Hunter/HunterBothResult';
import { HunterEvenRows } from 'src/components/Hunter/HunterEvenRows';
import { HunterHunter } from 'src/components/Hunter/HunterHunter';

type STYLEOBJ = {
  height: string;
};

type HUNTEROBJ = {
  id: number;
  classes: string;
  styles: {
    width: string;
    top: string;
    left: string;
  };
  textHidden: boolean;
  hunterEvenRows: boolean;
};

const Index: NextPage = () => {
  //////// useState  ////////
  // 幅と高さを入力するテキストボックス
  const [widthInputText, setWidthInputText] = useState<string>('');
  const [heightInputText, setHeightInputText] = useState<string>('');

  //////// setState(入力テキストを取得)  ////////
  const widthTextGet = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidthInputText(e.target.value);
  };
  const heightTextGet = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeightInputText(e.target.value);
  };

  //////// 各変数  ////////
  const grayBoxNum: number = parseFloat(heightInputText) / 1820; // ボックスの個数
  const hunterListBoxHeight: any = (1820 / parseFloat(heightInputText)) * 100; // HunterListのボックスの高さ
  const divisionRemainderHeight: number = parseFloat(heightInputText) % 1820; // 高さにあまりがあるか
  let divisionRemainderHeightValue: number = 0; // 割ったあまりの数字
  let divisionJustText: string = ''; // 割ったあまりが0の場合に入れるテキスト変数
  let divisionRemainderBoxHeightandTopPosition: string | number = ''; // 各余りテキストの高さとTOPポジションの高さを格納

  let hunterListWrapBoxWidth: any = '25'; // HunterListの親ボックスの幅
  const divisionRemainderWidth: number = parseFloat(widthInputText) % 303; // 幅にあまりがあるか
  const divisionRemainderWidthValue: number = divisionRemainderWidth; // 割ったあまりの数字
  let divisionRemainderBoxWidthPosition: number = 0; // 幅が余る場合、横にずらすための数字を格納
  let divisionRemainderText: string = ''; //余りの場合の数値を格納

  let divisionRemainderHeightValueText: string | number = ''; // 余りのテキストを格納
  let simulationFlag: boolean = false; // 計算ボックスを表示させるフラグ

  // 幅、高さが両方入力されたらボックス生成開始
  if (widthInputText.length > 0 && heightInputText.length > 0) {
    simulationFlag = true;
  }

  //////// crateObject  ////////
  const hunterListCreateElem: object[] = [];
  for (let i = 0; i < grayBoxNum; i++) {
    hunterListCreateElem.push({
      id: Math.floor(Math.random() * 100000000001) * i,
    });
  }

  //////// boxStyles  ////////
  const hunterListStyles: STYLEOBJ = {
    height: `${parseFloat(hunterListBoxHeight)}% !important`,
  };

  const divisionResultStyles: STYLEOBJ = {
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

  ///// 計算処理 ///////
  // 高さの余りが910で割り切れれば、1820の倍数なのでピッタリ
  if (divisionRemainderHeightValue % 910 === 0) {
    divisionJustText = '1820mmピッタリ';
    divisionRemainderText = `<span class="block text-center text-black w-full" style="height: ${divisionResultStyles.height}">${divisionJustText}</span>`;
  } else {
    //割り切れなければ、余りを表示と「1820 - 余り」を表示
    divisionRemainderText = `<span class="block text-center text-black text-xs w-full" style="height: ${
      divisionResultStyles.height
    }%">埋められるのは${divisionRemainderHeightValue}mm</span>
        <span class="block text-center text-black text-xs w-full"
        }%">余るのは${1820 - divisionRemainderHeightValue}mm</span>`;
  }

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

  ///// ドラッグ処理 ///////
  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
  };

  // https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/reset-server-context.md
  resetServerContext();
  renderToString();

  ///// HunterListをドラッグ可能にするためオブジェクトをループして生成させる ///////
  const HunterListLoopObj: HUNTEROBJ[] = [
    {
      id: Math.floor(Math.random() * 10001),
      classes: 'h-full w-3/12 absolute',
      styles: {
        width: `${hunterListWrapBoxWidth}%`,
        top: `0`,
        left: `-${divisionRemainderBoxWidthPosition}%`,
      },
      textHidden: false,
      hunterEvenRows: false,
    },
    {
      id: Math.floor(Math.random() * 10001),
      classes: 'h-full w-3/12 absolute left-1/4',
      styles: {
        width: `${hunterListWrapBoxWidth}%`,
        top: `${divisionRemainderBoxHeightandTopPosition}%`,
        left: `${hunterListWrapBoxWidth - divisionRemainderBoxWidthPosition}%`,
      },
      textHidden: true,
      hunterEvenRows: true,
    },
    {
      id: Math.floor(Math.random() * 10001),
      classes: 'h-full w-3/12 absolute left-2/4',
      styles: {
        width: `${hunterListWrapBoxWidth}%`,
        top: `0%`,
        left: `${
          hunterListWrapBoxWidth * 2 - divisionRemainderBoxWidthPosition
        }%`,
      },
      textHidden: false,
      hunterEvenRows: false,
    },
    {
      id: Math.floor(Math.random() * 10001),
      classes: 'h-full w-3/12 absolute left-3/4',
      styles: {
        width: `${hunterListWrapBoxWidth}%`,
        top: `${divisionRemainderBoxHeightandTopPosition}%`,
        left: `${
          hunterListWrapBoxWidth * 3 - divisionRemainderBoxWidthPosition
        }%`,
      },
      textHidden: true,
      hunterEvenRows: true,
    },
  ];

  //ドラッグ可能にするため、Draggableコンポーネントに連番を振る
  let nums = 0;

  return (
    <div>
      <Head>
        <title>ハンターハンター | Next.jsアプリ</title>
      </Head>
      <Heading1>大工計算ツール</Heading1>
      <Text>大工が使用する計算ツールです。</Text>
      <HunterHunter
        widthValue={divisionRemainderWidth}
        heightValue={divisionRemainderHeight}
      />
      <section className="mb-20 overflow-y-auto">
        {simulationFlag ? (
          <>
            <HunterWidthResult
              divisionRemainderWidthValue={divisionRemainderWidthValue}
            />
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable key={1} droppableId="test">
                {(provided) => (
                  <div
                    className="relative flex h-80 border-2 border-solid border-gray-500"
                    {...provided.droppableProps}
                    ref={provided.innerRef}>
                    {HunterListLoopObj.map((key: any) => {
                      // 奇数列の場合
                      if (!key.hunterEvenRows) {
                        return (
                          <div
                            key={key.id}
                            className={key.classes}
                            style={{
                              width: key.styles.width,
                              top: key.styles.top,
                              left: key.styles.left,
                            }}>
                            {hunterListCreateElem.map(
                              (keys: any, index: any) => {
                                nums++;
                                // ボックスが50を超えると見えないし処理が激重なため49で中断
                                if (index > 49) return;
                                // 奇数列で最後のボックス以外
                                if (index !== hunterListCreateElem.length - 1) {
                                  return (
                                    <Draggable
                                      draggableId={String(keys.id + key.id)}
                                      key={keys.id}
                                      index={nums}>
                                      {(provided) => (
                                        <div
                                          // style={hunterListStyles}
                                          style={{
                                            height: `${parseFloat(
                                              hunterListBoxHeight
                                            )}%`,
                                          }}>
                                          <HunterList
                                            ref={provided.innerRef}
                                            class="h-full"
                                            provided={provided}
                                          />
                                        </div>
                                      )}
                                    </Draggable>
                                  );
                                } else {
                                  return (
                                    <Draggable
                                      draggableId={String(keys.id + key.id)}
                                      key={keys.id}
                                      index={nums}>
                                      {(provided) => (
                                        <div
                                          // style={hunterListStyles}
                                          style={{
                                            height: `${parseFloat(
                                              hunterListBoxHeight
                                            )}%`,
                                          }}>
                                          <HunterList
                                            ref={provided.innerRef}
                                            class="h-full flex-col justify-between"
                                            innerHTML={{
                                              __html: divisionRemainderText,
                                            }}
                                            provided={provided}
                                          />
                                        </div>
                                      )}
                                    </Draggable>
                                  );
                                }
                              }
                            )}
                          </div>
                        );
                      } else {
                        // 偶数列の場合
                        return (
                          <div
                            key={key.id}
                            className={key.classes}
                            style={{
                              width: key.styles.width,
                              top: key.styles.top,
                              left: key.styles.left,
                            }}>
                            {hunterListCreateElem.map(
                              (keys: any, index: any) => {
                                nums++;
                                // ボックスが50を超えると見えないし処理が激重なため49で中断
                                if (index > 49) return;
                                return (
                                  <Draggable
                                    draggableId={String(keys.id + key.id)}
                                    key={keys.id}
                                    index={nums}>
                                    {(provided) => (
                                      <div
                                        // style={hunterListStyles}
                                        style={{
                                          height: `${parseFloat(
                                            hunterListBoxHeight
                                          )}%`,
                                        }}>
                                        <HunterList
                                          ref={provided.innerRef}
                                          class="h-full bg-white justify-start flex-col"
                                          provided={provided}>
                                          <HunterEvenRows
                                            styleHeightandTop={
                                              divisionRemainderBoxHeightandTopPosition
                                            }
                                            text={
                                              divisionRemainderHeightValueText
                                            }
                                            isShow={simulationFlag}
                                          />
                                        </HunterList>
                                      </div>
                                    )}
                                  </Draggable>
                                );
                              }
                            )}
                          </div>
                        );
                      }
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </>
        ) : null}
      </section>
      <div className="flex space-x-4 mb-5">
        <TextInput
          label="幅(mm)"
          variant="outlined"
          inputAttr={{ inputMode: 'numeric', pattern: '^[0-9]+$' }}
          onChange={widthTextGet}
          value={widthInputText}
        />
        <TextInput
          label="高さ(mm)"
          variant="outlined"
          inputAttr={{ inputMode: 'numeric', pattern: '^[0-9]+$' }}
          onChange={heightTextGet}
          value={heightInputText}
        />
      </div>
      <HunterBothResult
        widthInputText={widthInputText}
        heightInputText={heightInputText}
      />
    </div>
  );
};

export default Index;
