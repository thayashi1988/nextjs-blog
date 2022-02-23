import React, { useRef, useState, memo } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Heading1 } from '@/components/Heading/Heading1';
import { Text } from '@/components/Text/Text';
import { Btn } from '@/components/Button/Btn';
import { useLazyQuery } from '@apollo/client';
import { searchMonster } from '../../../apollo/queries';
import { BtnSuccess } from '@/components/Button/BtnSuccess';
import { NextImg } from '@/components/Img/Img';
import { TextAlert } from '@/components/Text/TextAlert';
import { Grid } from '@/components/Grid/Grid';
import { GridItem } from '@/components/Grid/GridItem';

const Index: NextPage = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [pokemonName, setPokemonName] = useState('');
  const [getPokemos, { loading, error, data }] = useLazyQuery(searchMonster, {
    variables: { name: pokemonName },
  });
  console.log('data:', data);

  const submitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (ref !== null && ref.current !== null && ref.current.value !== '') {
      setPokemonName(ref.current.value);
      console.log('pokemonName:', pokemonName);
      getPokemos();
    } else {
      alert('ポケモンの名前を入力してください。');
    }
  };

  const ShowCondition = () => {
    if (!pokemonName)
      return <TextAlert>ポケモンの名前を入力してください。</TextAlert>;
    if (loading) return <Text>Loading...</Text>;
    if (error) return <TextAlert>{`Error! ${error.message}`}</TextAlert>;
    if (!data || !data.pokemon) return <TextAlert>No Data.</TextAlert>;

    return (
      <div className="max-w-lg mx-auto">
        <Grid class="grid-cols-2 gap-2">
          <GridItem>No: {data?.pokemon?.number}</GridItem>
          <GridItem>Name: {data?.pokemon?.name}</GridItem>
          <GridItem>type: {data?.pokemon?.types[0]}</GridItem>
          <GridItem>classification: {data?.pokemon?.classification}</GridItem>
          <GridItem>height: {data?.pokemon?.height.maximum}</GridItem>
          <GridItem>weight: {data?.pokemon?.weight.maximum}</GridItem>
          <GridItem>
            attacks(fast):
            <ul>
              {data?.pokemon?.attacks.fast.length !== 0
                ? data.pokemon.attacks.fast.map((skill) => {
                    return (
                      <li key={skill.name} className="pl-2">
                        {skill.name}
                      </li>
                    );
                  })
                : null}
            </ul>
          </GridItem>
          <GridItem>
            attacks(special):
            <ul>
              {data?.pokemon?.attacks.special.length !== 0
                ? data.pokemon.attacks.special.map((skill) => {
                    return (
                      <li key={skill.name} className="pl-2">
                        {skill.name}
                      </li>
                    );
                  })
                : null}
            </ul>
          </GridItem>
        </Grid>
        {/* <p>No: {data?.pokemon?.number}</p>
        <p>Name: {data?.pokemon?.name}</p>
        <p>type: {data?.pokemon?.types[0]}</p>
        <p>classification: {data?.pokemon?.classification}</p>
        <p>height: {data?.pokemon?.height.maximum}</p>
        <p>weight: {data?.pokemon?.weight.maximum}</p>
        <p>attacks:</p>
        <ul>
          {data?.pokemon?.attacks.fast.length !== 0
            ? data.pokemon.attacks.fast.map((skill) => {
                return <li key={skill.name}>{skill.name}</li>;
              })
            : null}
        </ul> */}
        {data?.pokemon?.image ? (
          <NextImg
            class="text-center"
            src={data?.pokemon?.image}
            alt={data?.pokemon?.name ?? ''}
            width="360"
            height="377"
          />
        ) : (
          <p>画像がありませんでした。。</p>
        )}
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>ポケモン検索 | GraphQL | Next.jsアプリ</title>
      </Head>
      <Heading1>ポケモン検索 | GraphQL</Heading1>
      <Text>ポケモン（英名）を入力して検索します。</Text>
      <div className="flex flex-col sm:flex-row items-baseline justify-center gap-4">
        <input
          type="text"
          ref={ref}
          placeholder="ポケモンの名前を入力してください。"
          className="text-sm border border-gray-500 rounded-md p-3"
        />
        <Btn link={false} click={submitHandler}>
          検索
        </Btn>
      </div>
      <ShowCondition />
      <BtnSuccess
        link={true}
        href="/gql"
        class="text-center"
        margin="text-center">
        ポケモンページへ戻る
      </BtnSuccess>
    </>
  );
};

export default memo(Index);
