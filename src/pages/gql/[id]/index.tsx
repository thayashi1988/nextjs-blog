import React, { memo } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Heading1 } from '@/components/Heading/Heading1';
import { useQuery } from '@apollo/client';
import { searchMonster } from '../../../apollo/queries';
import { BtnSuccess } from '@/components/Button/BtnSuccess';
import { NextImg } from '@/components/Img/Img';
import { TextAlert } from '@/components/Text/TextAlert';
import { Grid } from '@/components/Grid/Grid';
import { GridItem } from '@/components/Grid/GridItem';
import { useRouter } from 'next/router';
import { LoadingPokemonDetail } from '@/components/Loading/LoadingPokemonDetail';

const Index: NextPage = () => {
  const router = useRouter();
  const { loading, error, data } = useQuery(searchMonster, {
    variables: { name: router.query.id },
  });

  const ShowCondition = () => {
    if (loading) return <LoadingPokemonDetail />;
    if (error) return <TextAlert>{`Error! ${error.message}`}</TextAlert>;
    if (!data || !data.pokemon)
      return <TextAlert>データがありませんでした。。</TextAlert>;

    return (
      <div className="max-w-5xl mx-auto mb-5">
        <Grid class="grid-cols-1 sm:grid-cols-2 gap-2">
          <GridItem>
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
          </GridItem>
          <GridItem>
            <Grid class="grid-cols-2 gap-2">
              <GridItem>No: {data?.pokemon?.number}</GridItem>
              <GridItem>Name: {data?.pokemon?.name}</GridItem>
              <GridItem>type: {data?.pokemon?.types[0]}</GridItem>
              <GridItem>
                classification: {data?.pokemon?.classification}
              </GridItem>
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
          </GridItem>
        </Grid>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>ポケモン詳細 | GraphQL | Next.jsアプリ</title>
      </Head>
      <Heading1>ポケモン詳細 | GraphQL</Heading1>
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
