import React, { useState, useRef } from 'react';
import type { NextPage } from 'next';
import { renderToString } from 'react-dom/server';

import {
  DragDropContext,
  Droppable,
  Draggable,
  resetServerContext,
} from 'react-beautiful-dnd';

import Head from 'next/head';
import Layout from 'src/components/Layout/layout';
import { TextInput } from 'src/components/Hunter/HunterTextInput';
import { HunterList } from 'src/components/Hunter/HunterList';
import { HunterListWrap } from 'src/components/Hunter/HunterListWrap';
import { HunterWidthResult } from 'src/components/Hunter/HunterWidthResult';
import { HunterBothResult } from 'src/components/Hunter/HunterBothResult';
import { HunterEvenRows } from 'src/components/Hunter/HunterEvenRows';
import { HunterHunter } from 'src/components/Hunter/HunterHunter';
import { HunterDiv } from 'src/components/Hunter/HunterDiv';

// interface VARIABLE{
//   widthInputText: number;
//   heightInputText: number;
//   grayBoxNum: number;
//   hunterListBoxHeight: any;
//   divisionRemainderHeightValue: string | number;
// };

type HunterObj = {
  divisionJustText: string | number;
  divisionRemainderText: string | number;
  isTextHidden: boolean;
};

export const Index: NextPage = () => {
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
  const divisionRemainderWidthValue: number = divisionRemainderWidth; // 割ったあまりの数字
  let divisionRemainderBoxWidthPosition: number = 0; // 幅が余る場合、横にずらすための数字を格納
  let divisionRemainderText: string = ''; //余りの場合の数値を格納

  let divisionRemainderHeightValueText: string | number = ''; // 余りのテキストを格納
  let simulationFlag: boolean = false; // 計算ボックスを表示させるフラグ
  const arrayObj: HunterObj[] = []; //ボックス生成のためのオブジェクト

  const refRef = useRef();

  // 幅、高さが両方入力されたらボックス生成開始
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

  // mapのためにオブジェクト生成
  const hunterListCreateElem: any = [];
  for (let i = 0; i < grayBoxNum; i++) {
    hunterListCreateElem.push({ id: Math.floor(Math.random() * 10000001) * i });
  }
  // console.log('grayBoxNum:', grayBoxNum);

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

  const ShowHunterList = (props) => {
    const isShow: Boolean = props.isShow;
    const isTextHidden: Boolean = props.isTextHidden;
    if (isShow) {
      return hunterListCreateElem.map((key: any, index: number) => {
        // 偶数列と最後のボックス以外は余りのテキストを出さない
        if (isTextHidden || index !== hunterListCreateElem.length - 1) {
          return (
            // <HunterList key={key.id} style={hunterListStyles} />;
            <span key={key.id}></span>
          );
        } else {
          return (
            <HunterList
              key={key.id}
              // ref={props.ref}
              class="justify-start bg-white flex-col"
              style={hunterListStyles}
              innerHTML={{ __html: divisionRemainderText }}
            />
          );
        }
      });
    } else {
      return <span></span>;
    }
  };

  // HunterListボックス生成
  // const ShowHunterList = (props) => {
  //   const isShow: Boolean = props.isShow;
  //   const isTextHidden: Boolean = props.isTextHidden;
  //   if (isShow) {
  //     return hunterListCreateElem.map((key: any, index: number) => {
  //       // 偶数列は余りのテキストを出さない処理
  //       if (isTextHidden) {
  //         return <HunterList key={key} style={hunterListStyles}></HunterList>;
  //       }

  //       // HunterListの最後のボックスであれば余りのテキストを表示
  //       if (key === hunterListCreateElem.length - 1) {
  //         return (
  //           <HunterList
  //             key={key}
  //             class="justify-start bg-white flex-col"
  //             style={hunterListStyles}
  //             innerHTML={{ __html: divisionRemainderText }}></HunterList>
  //         );
  //       } else {
  //         return <HunterList key={key} style={hunterListStyles}></HunterList>;
  //       }
  //     });
  //   } else {
  //     return <span></span>;
  //   }
  // };

  // const pra: any = useRef(null);
  // console.log(pra.current);
  // pra.ondragstart = function (e) {
  //   return false;
  // };
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
  // console.log(arrayObj);

  ///// ドラッグ処理 ///////
  const aaa = [
    {
      asasas: 'aaaaa',
    },
    {
      asasas: 'bbb',
    },
    {
      asasas: 'ccc',
    },
    {
      asasas: 'dddd',
    },
    {
      asasas: 'fff',
    },
    {
      asasas: 'eee',
    },
    {
      asasas: 'qqq',
    },
    {
      asasas: 'lll',
    },
  ];
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
  };
  resetServerContext();
  renderToString();

  ///// ループテスト ///////
  const LoopObj = [
    {
      id: Math.floor(Math.random() * 10001),
      classes: 'h-full w-3/12 absolute',
      styles: [
        {
          width: `${hunterListWrapBoxWidth}%`,
          top: `0`,
          left: `-${divisionRemainderBoxWidthPosition}%`,
        },
      ],
      textHidden: false,
      hunterEvenRows: false,
    },
    {
      id: Math.floor(Math.random() * 10001),
      classes: 'h-full w-3/12 absolute left-1/4',
      styles: [
        {
          width: `${hunterListWrapBoxWidth}%`,
          top: `${divisionRemainderBoxHeightandTopPosition}%`,
          left: `${
            hunterListWrapBoxWidth - divisionRemainderBoxWidthPosition
          }%`,
        },
      ],
      textHidden: true,
      hunterEvenRows: true,
    },
    {
      id: Math.floor(Math.random() * 10001),
      classes: 'h-full w-3/12 absolute left-2/4',
      styles: [
        {
          width: `${hunterListWrapBoxWidth}%`,
          top: `0%`,
          left: `${
            hunterListWrapBoxWidth * 2 - divisionRemainderBoxWidthPosition
          }%`,
        },
      ],
      textHidden: false,
      hunterEvenRows: false,
    },
    {
      id: Math.floor(Math.random() * 10001),
      classes: 'h-full w-3/12 absolute left-3/4',
      styles: [
        {
          width: `${hunterListWrapBoxWidth}%`,
          top: `${divisionRemainderBoxHeightandTopPosition}%`,
          left: `${
            hunterListWrapBoxWidth * 3 - divisionRemainderBoxWidthPosition
          }%`,
        },
      ],
      textHidden: true,
      hunterEvenRows: true,
    },
  ];
  // console.log(LoopObj);
  // console.log(ref);
  // const lalkk = React.createRef();
  // console.log(lalkk);

  return (
    <Layout home={false}>
      <Head>
        <title>ハンターハンター</title>
      </Head>

      <section className="pb-20 mb-28 overflow-y-auto">
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
                {LoopObj.map((key, index) => {
                  if (!key.hunterEvenRows) {
                    return (
                      <div
                        key={key.id}
                        className={key.classes}
                        style={{
                          width: key.styles[0].width,
                          top: key.styles[0].top,
                          left: key.styles[0].left,
                        }}>
                        {hunterListCreateElem.map((keys: any, index: any) => {
                          return (
                            <Draggable
                              draggableId={String(keys.id + key.id)}
                              key={keys.id}
                              index={index}>
                              {(provided) => (
                                // <HunterDiv
                                //   class="text-red-600"
                                //   provided={provided}
                                //   // {...provided.draggableProps}
                                //   // {...provided.dragHandleProps}
                                //   ref={provided.innerRef}>
                                //   {keys.id}
                                // </HunterDiv>
                                <HunterList
                                  style={hunterListStyles}
                                  ref={provided.innerRef}
                                  provided={provided}
                                />
                                // <p
                                //   // key={keys}
                                //   ref={provided.innerRef}
                                //   {...provided.draggableProps}
                                //   {...provided.dragHandleProps}
                                //   // isShow={simulationFlag}
                                // >
                                //   <span>{keys.id}</span>
                                // </p>
                              )}
                            </Draggable>
                          );
                        })}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={key.id}
                        className={key.classes}
                        style={{
                          width: key.styles[0].width,
                          top: key.styles[0].top,
                          left: key.styles[0].left,
                        }}>
                        {hunterListCreateElem.map((keys: any, num: any) => {
                          // console.log(num);

                          return (
                            <>
                              <Draggable
                                draggableId={String(keys.id + key.id)}
                                key={keys.id}
                                index={num}>
                                {(provided) => (
                                  <HunterList
                                    style={hunterListStyles}
                                    ref={provided.innerRef}
                                    provided={provided}
                                  />
                                )}
                              </Draggable>
                              <HunterEvenRows
                                styleHeightandTop={
                                  divisionRemainderBoxHeightandTopPosition
                                }
                                text={divisionRemainderHeightValueText}
                                isShow={simulationFlag}
                              />
                            </>
                          );
                        })}
                        {/* <ShowHunterList
                          isShow={simulationFlag}
                          isTextHidden={key.textHidden}
                        />
                        <HunterEvenRows
                          styleHeightandTop={
                            divisionRemainderBoxHeightandTopPosition
                          }
                          text={divisionRemainderHeightValueText}
                          isShow={simulationFlag}
                        /> */}
                      </div>
                    );
                  }
                })}
                {/* <div
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
          </div> */}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </section>
      <HunterHunter
        widthValue={divisionRemainderWidth}
        heightValue={divisionRemainderHeight}
      />
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
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="sample">
          {(provided) => (
            <div
              className="bg-blue-400 mb-7 h-auto"
              {...provided.droppableProps}
              ref={provided.innerRef}>
              {aaa.map((key, index) => {
                return (
                  <Draggable
                    draggableId={key.asasas}
                    key={key.asasas}
                    index={index}>
                    {(provided) => (
                      <p
                        className="mb-2 p-5 bg-yellow-200"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}>
                        {key.asasas}
                      </p>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <HunterBothResult
        widthInputText={widthInputText}
        heightInputText={heightInputText}
      />
    </Layout>
  );
};

export default Index;
