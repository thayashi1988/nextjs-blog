import { useState, useCallback, memo } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import calsses from 'src/styles/weather.module.css';
import { Text } from '@/components/Text/Text';
import { Heading1 } from '@/components/Heading/Heading1';
import { NextLink } from '@/components/Link/Link';
import { BtnSuccess } from '@/components/Button/BtnSuccess';
import { WeatherInput } from '@/components/Weather/WeatherInput';

const apiUrl: string = 'https://weather.tsukumijima.net/api/forecast?city=';

const Index: NextPage = memo(() => {
  console.log('wether レンダリング');
  const [val, setVal] = useState('');
  const [city, setCity] = useState('');
  const [tempMax, setTempMax] = useState('');
  const [telop, setTelop] = useState('');
  const [rainArrrayJoin, setRainArrayJoin] = useState([]);

  //当日の日付取得関数
  const dateBuilder = useCallback((): string => {
    const d = new Date();
    const months = [
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
    const days = ['日曜', '月曜', '火曜', '水曜', '木曜', '金曜', '土曜'];
    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${year}年 ${month} ${date}日 ${day}`;
  }, []);

  const handleGetInputData = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setVal(e.target.value);
    },
    [setVal]
  );

  const handleKeyPressWatherCheck = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const pressKey = e.key;
      if (pressKey === 'Enter') {
        fetchWeather(val);
        dateBuilder();
      }
    },
    [val, dateBuilder]
  );

  const handleClickWeatherCheck = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      fetchWeather(val);
      dateBuilder();
    },
    [val, dateBuilder]
  );

  const fetchWeather = async (areaCode: string) => {
    try {
      // state初期化
      setCity('');
      setTempMax('');
      setTelop('');
      setRainArrayJoin([]);
      const res = await fetch(`${apiUrl}${areaCode}`);
      const jsonData = await res.json();
      console.log('jsonData:', jsonData);

      // stateセット
      setCity(jsonData.location.city);
      setTempMax(jsonData.forecasts[1].temperature.max.celsius);
      setTelop(jsonData.forecasts[0].telop);

      // 降水確率処理
      const rain = jsonData.forecasts[0].chanceOfRain;
      const rainArray = [];
      for (const [key, value] of Object.entries(rain)) {
        const txtSplit = key.split(/T/)[1];
        const txtReplace = txtSplit.replace(/_/, '〜');
        rainArray.push(`${txtReplace}時： ${value}`);
      }
      setRainArrayJoin(rainArray);
    } catch (error) {
      //該当地域がなければアラート
      alert('該当するエリアがデータにありません。');
      console.log('error:', error);
    }
  };

  return (
    <>
      <Head>
        <title>天気予報ページ | Next.jsアプリ</title>
      </Head>
      <Heading1>天気予報API</Heading1>
      <Text class="!mb-0">
        以下天気用法APIを叩いて各地地域の天気予報を表示します。
      </Text>
      <NextLink target href="https://weather.tsukumijima.net/">
        https://weather.tsukumijima.net/
      </NextLink>
      <Text class="!mb-0 inline-block">APIの仕様上、</Text>
      <NextLink
        margin="!mb-0 inline-block"
        target
        href="https://weather.tsukumijima.net/primary_area.xml">
        全国の地点定義表
      </NextLink>
      <Text>
        の地域コードを入力する形となります。
        <br />
        例）那覇 = 471010
      </Text>

      <div className={`${calsses.app}`}>
        <div className={`${calsses.container}`}>
          <div className={`${calsses.search_box}`}>
            <WeatherInput
              change={handleGetInputData}
              keypress={handleKeyPressWatherCheck}
              class={calsses.search_bar}
            />
            <BtnSuccess
              margin="text-center mt-3"
              link={false}
              click={handleClickWeatherCheck}>
              天気予報をチェック
            </BtnSuccess>
          </div>

          <div className={calsses.weather_wrap}>
            <div className={calsses.location_box}>
              <div className={calsses.location}>{city}</div>
              <div className={calsses.date}>{dateBuilder()}</div>
            </div>

            <div className={calsses.weather_box}>
              <div className={calsses.temp}>{tempMax}°c</div>
              <div className={calsses.rain}>
                {rainArrrayJoin.length !== 0 ? '降水確率' : null}
                <div className={calsses.rainlist}>
                  <ul>
                    {rainArrrayJoin.length !== 0
                      ? rainArrrayJoin.map((item) => {
                          return <li key={item}>{item}</li>;
                        })
                      : null}
                  </ul>
                </div>
              </div>
              <div className={calsses.weather}>{telop}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
export default Index;
