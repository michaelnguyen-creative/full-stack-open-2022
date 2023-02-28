import { gql } from '@apollo/client'

export const GET_REPOSITORIES = gql`
  query getRepositories {
    repositories {
      edges {
        node {
          fullName
          description
          language
          ownerAvatarUrl
          stargazersCount
          reviewCount
          forksCount
          ratingAverage
        }
      }
    }
  }
`

export const WHOAMI = gql`
query me {
  me {
    username
  }
}
`
