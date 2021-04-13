import type { NextPage } from 'next';
import { useState } from 'react';
import Layout from '../../components/layout';
import Head from 'next/head';
import { Btn } from '../../components/button/Btn';
import calsses from '../../styles/weather.module.css';

let val: string = '';
const apiUrl: string = 'https://weather.tsukumijima.net/api/forecast?city=';

export const Weather: NextPage = () => {
  const [city, setCity] = useState('');
  const [tempMax, setTempMax] = useState('');
  const [telop, setTelop] = useState('');
  const [rainArrrayJoin, setRainArrayJoin] = useState('');

  //当日の日付取得関数
  const dateBuilder = () => {
    let d = new Date();
    let months = [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ];
    let days = ['日曜', '月曜', '火曜', '水曜', '木曜', '金曜', '土曜'];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${year}年 ${month} ${date}日 ${day}`;
  };

  const inputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    val = e.target.value;
  };

  const weatherCheck = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const pressKey = e.key;
    if (pressKey === 'Enter') {
      fetchWeather(val);
      dateBuilder();
    }
  };

  const fetchWeather = async (areaName: string) => {
    try {
      // state初期化
      setCity('');
      setTempMax('');
      setTelop('');
      setRainArrayJoin('');
      const res = await fetch(`${apiUrl}${areaName}`);
      const jsonData = await res.json();
      console.log('jsonData:', jsonData);

      // stateセット
      setCity(jsonData.location.city);
      setTempMax(jsonData.forecasts[1].temperature.max.celsius);
      setTelop(jsonData.forecasts[0].telop);

      // 降水確率処理
      const rain = jsonData.forecasts[0].chanceOfRain;
      const rainArray = [];
      rainArray.push(`00~06時：${rain.T00_06}<br>`);
      rainArray.push(`06~12時：${rain.T06_12}<br>`);
      rainArray.push(`12~18時：${rain.T12_18}<br>`);
      rainArray.push(`18~24時：${rain.T18_24}<br>`);

      // 降水確率配列を文字列にしてstateにセット
      const test = rainArray.join('');
      setRainArrayJoin(test);
    } catch (error) {
      //該当地域がなければアラート
      alert('該当するエリアがデータにありません。');
      console.log('error:', error);
    }
  };

  return (
    <Layout home={false}>
      <Head>
        <title>天気予報ページ</title>
      </Head>
      {/* {rainArrrayJoin} */}
      <div className={`${calsses.app}`}>
        <div className={`${calsses.container}`}>
          <div className={`${calsses.search_box}`}>
            <input
              type="text"
              onChange={inputData}
              onKeyPress={weatherCheck}
              className={calsses.search_bar}
              placeholder="地域を入力..."
            />
            <Btn link={false}>チェック</Btn>
          </div>

          <div className={calsses.weather_wrap}>
            <div className={calsses.location_box}>
              <div className={calsses.location}>{city}</div>
              <div className={calsses.date}>{dateBuilder()}</div>
            </div>

            <div className={calsses.weather_box}>
              <div className={calsses.temp}>{tempMax}°c</div>
              <div className={calsses.rain}>
                降水確率
                <div
                  className={calsses.rainlist}
                  dangerouslySetInnerHTML={{ __html: rainArrrayJoin }}></div>
              </div>
              <div className={calsses.weather}>{telop}</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Weather;