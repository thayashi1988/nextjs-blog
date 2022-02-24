import React, { memo } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useQuery } from '@apollo/client';
import { searchPikachu, allMonsters } from '../../apollo/queries';
import { Heading1 } from '@/components/Heading/Heading1';
import { Text } from '@/components/Text/Text';
import { NextImg } from '@/components/Img/Img';
import { BtnSuccess } from '@/components/Button/BtnSuccess';
import { TextAlert } from '@/components/Text/TextAlert';
import { Grid } from '@/components/Grid/Grid';
import { GridItem } from '@/components/Grid/GridItem';
import { NextLink } from '@/components/Link/Link';
import { LoadingPokemonCard } from '@/components/Loading/LoadingPokemonCard';

const Index: NextPage = () => {
  // const { loading, error, data } = useQuery(searchPikachu, {
  //   variables: { name: 'Raticate' },
  // });
  const { loading, error, data } = useQuery(allMonsters);
  console.log('data:', data);

  const ShowCondition = () => {
    if (loading) return <LoadingPokemonCard />;
    if (error) return <TextAlert>{`Error! ${error.message}`}</TextAlert>;
    return (
      <div className="max-w-5xl mx-auto mb-5">
        <Grid class="grid-cols-2 sm:grid-cols-6 gap-2">
          {data?.pokemons?.length !== 0
            ? data.pokemons.map((poke) => {
                return (
                  <GridItem
                    key={poke.number}
                    class="rounded-md shadow-md p-2 border border-gray-200">
                    <Text>No: {poke?.number}</Text>
                    <Text>
                      Name: <br />
                      <NextLink href={`/gql/${poke?.name.toLowerCase()}`}>
                        {poke?.name}
                      </NextLink>
                    </Text>

                    {poke?.image ? (
                      <NextImg
                        class="text-center"
                        src={poke?.image}
                        alt={poke?.name ?? ''}
                        width="360"
                        height="377"
                      />
                    ) : (
                      <TextAlert>画像がありませんでした。。</TextAlert>
                    )}
                  </GridItem>
                );
              })
            : null}
        </Grid>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>GraphQL | Next.jsアプリ</title>
      </Head>
      <Heading1>GraphQL</Heading1>
      <Text>ポケモンのGraphQLをApollo Clientで取得して表示させています。</Text>
      <ShowCondition />
      <BtnSuccess
        link={true}
        href="/gql/search"
        class="text-center"
        margin="text-center">
        ポケモン検索ページへ行く
      </BtnSuccess>
    </>
  );
};

export default memo(Index);
