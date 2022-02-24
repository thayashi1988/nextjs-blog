import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** Represents a Pokémon's attack types */
export type Attack = {
  __typename?: 'Attack';
  /** The damage of this Pokémon attack */
  damage?: Maybe<Scalars['Int']>;
  /** The name of this Pokémon attack */
  name?: Maybe<Scalars['String']>;
  /** The type of this Pokémon attack */
  type?: Maybe<Scalars['String']>;
};

/** Represents a Pokémon */
export type Pokemon = {
  __typename?: 'Pokemon';
  /** The attacks of this Pokémon */
  attacks?: Maybe<PokemonAttack>;
  /** The classification of this Pokémon */
  classification?: Maybe<Scalars['String']>;
  /** The evolution requirements of this Pokémon */
  evolutionRequirements?: Maybe<PokemonEvolutionRequirement>;
  /** The evolutions of this Pokémon */
  evolutions?: Maybe<Array<Maybe<Pokemon>>>;
  fleeRate?: Maybe<Scalars['Float']>;
  /** The minimum and maximum weight of this Pokémon */
  height?: Maybe<PokemonDimension>;
  /** The ID of an object */
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  /** The maximum CP of this Pokémon */
  maxCP?: Maybe<Scalars['Int']>;
  /** The maximum HP of this Pokémon */
  maxHP?: Maybe<Scalars['Int']>;
  /** The name of this Pokémon */
  name?: Maybe<Scalars['String']>;
  /** The identifier of this Pokémon */
  number?: Maybe<Scalars['String']>;
  /** The type(s) of Pokémons that this Pokémon is resistant to */
  resistant?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** The type(s) of this Pokémon */
  types?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** The type(s) of Pokémons that this Pokémon weak to */
  weaknesses?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** The minimum and maximum weight of this Pokémon */
  weight?: Maybe<PokemonDimension>;
};

/** Represents a Pokémon's attack types */
export type PokemonAttack = {
  __typename?: 'PokemonAttack';
  /** The fast attacks of this Pokémon */
  fast?: Maybe<Array<Maybe<Attack>>>;
  /** The special attacks of this Pokémon */
  special?: Maybe<Array<Maybe<Attack>>>;
};

/** Represents a Pokémon's dimensions */
export type PokemonDimension = {
  __typename?: 'PokemonDimension';
  /** The maximum value of this dimension */
  maximum?: Maybe<Scalars['String']>;
  /** The minimum value of this dimension */
  minimum?: Maybe<Scalars['String']>;
};

/** Represents a Pokémon's requirement to evolve */
export type PokemonEvolutionRequirement = {
  __typename?: 'PokemonEvolutionRequirement';
  /** The amount of candy to evolve */
  amount?: Maybe<Scalars['Int']>;
  /** The name of the candy to evolve */
  name?: Maybe<Scalars['String']>;
};

/** Query any Pokémon by number or name */
export type Query = {
  __typename?: 'Query';
  pokemon?: Maybe<Pokemon>;
  pokemons?: Maybe<Array<Maybe<Pokemon>>>;
  query?: Maybe<Query>;
};


/** Query any Pokémon by number or name */
export type QueryPokemonArgs = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};


/** Query any Pokémon by number or name */
export type QueryPokemonsArgs = {
  first: Scalars['Int'];
};

export type CoreCommentFieldsFragment = { __typename?: 'Pokemon', number?: string | null, name?: string | null, types?: Array<string | null> | null, image?: string | null, evolutions?: Array<{ __typename?: 'Pokemon', number?: string | null, name?: string | null, types?: Array<string | null> | null } | null> | null };

export type AllMonstersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllMonstersQuery = { __typename?: 'Query', pokemons?: Array<{ __typename?: 'Pokemon', number?: string | null, name?: string | null, image?: string | null } | null> | null };

export type SearchPikachuQueryVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
}>;


export type SearchPikachuQuery = { __typename?: 'Query', pokemon?: { __typename?: 'Pokemon', number?: string | null, name?: string | null, types?: Array<string | null> | null, image?: string | null, evolutions?: Array<{ __typename?: 'Pokemon', number?: string | null, name?: string | null, types?: Array<string | null> | null } | null> | null } | null };

export type SearchMonsterQueryVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
}>;


export type SearchMonsterQuery = { __typename?: 'Query', pokemon?: { __typename?: 'Pokemon', number?: string | null, name?: string | null, types?: Array<string | null> | null, image?: string | null, classification?: string | null, resistant?: Array<string | null> | null, weaknesses?: Array<string | null> | null, weight?: { __typename?: 'PokemonDimension', maximum?: string | null } | null, height?: { __typename?: 'PokemonDimension', maximum?: string | null } | null, evolutions?: Array<{ __typename?: 'Pokemon', number?: string | null, name?: string | null, types?: Array<string | null> | null } | null> | null, attacks?: { __typename?: 'PokemonAttack', fast?: Array<{ __typename?: 'Attack', name?: string | null, type?: string | null } | null> | null, special?: Array<{ __typename?: 'Attack', name?: string | null, type?: string | null } | null> | null } | null } | null };

export const CoreCommentFieldsFragmentDoc = gql`
    fragment CoreCommentFields on Pokemon {
  number
  name
  types
  image
  evolutions {
    number
    name
    types
  }
}
    `;
export const AllMonstersDocument = gql`
    query allMonsters {
  pokemons(first: 151) {
    number
    name
    image
  }
}
    `;

/**
 * __useAllMonstersQuery__
 *
 * To run a query within a React component, call `useAllMonstersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllMonstersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllMonstersQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllMonstersQuery(baseOptions?: Apollo.QueryHookOptions<AllMonstersQuery, AllMonstersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllMonstersQuery, AllMonstersQueryVariables>(AllMonstersDocument, options);
      }
export function useAllMonstersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllMonstersQuery, AllMonstersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllMonstersQuery, AllMonstersQueryVariables>(AllMonstersDocument, options);
        }
export type AllMonstersQueryHookResult = ReturnType<typeof useAllMonstersQuery>;
export type AllMonstersLazyQueryHookResult = ReturnType<typeof useAllMonstersLazyQuery>;
export type AllMonstersQueryResult = Apollo.QueryResult<AllMonstersQuery, AllMonstersQueryVariables>;
export const SearchPikachuDocument = gql`
    query searchPikachu($name: String) {
  pokemon(name: $name) {
    number
    name
    types
    image
    evolutions {
      number
      name
      types
    }
  }
}
    `;

/**
 * __useSearchPikachuQuery__
 *
 * To run a query within a React component, call `useSearchPikachuQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchPikachuQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchPikachuQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useSearchPikachuQuery(baseOptions?: Apollo.QueryHookOptions<SearchPikachuQuery, SearchPikachuQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchPikachuQuery, SearchPikachuQueryVariables>(SearchPikachuDocument, options);
      }
export function useSearchPikachuLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchPikachuQuery, SearchPikachuQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchPikachuQuery, SearchPikachuQueryVariables>(SearchPikachuDocument, options);
        }
export type SearchPikachuQueryHookResult = ReturnType<typeof useSearchPikachuQuery>;
export type SearchPikachuLazyQueryHookResult = ReturnType<typeof useSearchPikachuLazyQuery>;
export type SearchPikachuQueryResult = Apollo.QueryResult<SearchPikachuQuery, SearchPikachuQueryVariables>;
export const SearchMonsterDocument = gql`
    query searchMonster($name: String) {
  pokemon(name: $name) {
    number
    name
    types
    image
    classification
    resistant
    weaknesses
    weight {
      maximum
    }
    height {
      maximum
    }
    evolutions {
      number
      name
      types
    }
    attacks {
      fast {
        name
        type
        name
      }
      special {
        name
        type
        name
      }
    }
  }
}
    `;

/**
 * __useSearchMonsterQuery__
 *
 * To run a query within a React component, call `useSearchMonsterQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchMonsterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchMonsterQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useSearchMonsterQuery(baseOptions?: Apollo.QueryHookOptions<SearchMonsterQuery, SearchMonsterQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchMonsterQuery, SearchMonsterQueryVariables>(SearchMonsterDocument, options);
      }
export function useSearchMonsterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchMonsterQuery, SearchMonsterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchMonsterQuery, SearchMonsterQueryVariables>(SearchMonsterDocument, options);
        }
export type SearchMonsterQueryHookResult = ReturnType<typeof useSearchMonsterQuery>;
export type SearchMonsterLazyQueryHookResult = ReturnType<typeof useSearchMonsterLazyQuery>;
export type SearchMonsterQueryResult = Apollo.QueryResult<SearchMonsterQuery, SearchMonsterQueryVariables>;