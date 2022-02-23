import gql from 'graphql-tag';
// import {gql} from '@apollo/client'

export const CORE_COMMENT_FIELDS = gql`
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

export const allMonsters = gql`
  query allMonsters {
    pokemons(first: 151) {
      number
      name
      image
    }
  }
`;

export const searchPikachu = gql`
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

export const searchMonster = gql`
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
