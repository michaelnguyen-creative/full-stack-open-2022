import { gql } from '@apollo/client'
import { BASE_REPO_DETAILS, BASE_REVIEW_DETAILS } from './fragments'

export const GET_REPOSITORIES = gql`
  ${BASE_REPO_DETAILS}
  query getRepositories {
    repositories {
      edges {
        node {
          ...BaseRepoDetails
        }
      }
    }
  }
`

export const GET_REPOSITORIES_ORDER = gql`
  ${BASE_REPO_DETAILS}
  query getRepositoriesOrder(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
  ) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
      edges {
        node {
          ...BaseRepoDetails
        }
      }
    }
  }
`

export const GET_REPOSITORIES_KEYWORD = gql`
  ${BASE_REPO_DETAILS}
  query getRepositoriesKeyword($searchKeyword: String) {
    repositories(searchKeyword: $searchKeyword) {
      edges {
        node {
          ...BaseRepoDetails
        }
      }
    }
  }
`

export const WHOAMI = gql`
  ${BASE_REVIEW_DETAILS}
  query whoAmI($includeReview: Boolean! = false) {
    me {
      username
      reviews @include(if: $includeReview) {
        edges {
          node {
            ...BaseReviewDetails
          }
        }
      }
    }
  }
`

export const GET_REPO = gql`
  ${BASE_REPO_DETAILS}
  ${BASE_REVIEW_DETAILS}
  query getRepo($repoId: ID!) {
    repository(id: $repoId) {
      ...BaseRepoDetails
      url
      reviews {
        edges {
          node {
            ...BaseReviewDetails
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`
