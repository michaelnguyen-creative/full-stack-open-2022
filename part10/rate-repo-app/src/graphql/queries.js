import { gql } from '@apollo/client'
import {
  BASE_REPO_DETAILS,
  BASE_REVIEW_DETAILS,
  BASE_USER_DETAILS,
} from './fragments'

export const GET_REPOS = gql`
  ${BASE_REPO_DETAILS}
  query getRepositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      edges {
        node {
          ...BaseRepoDetails
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
    }
  }
`

export const WHOAMI = gql`
  ${BASE_USER_DETAILS}
  ${BASE_REVIEW_DETAILS}
  query whoAmI($includeReview: Boolean! = false) {
    me {
      ...BaseUserDetails
      reviews @include(if: $includeReview) {
        edges {
          node {
            ...BaseReviewDetails
            repository {
              fullName
              url
            }
          }
        }
      }
    }
  }
`

export const GET_REPO = gql`
  ${BASE_REPO_DETAILS}
  ${BASE_REVIEW_DETAILS}
  ${BASE_USER_DETAILS}
  query getRepo(
    $repositoryId: ID!,
    $first: Int,
    $after: String,
    ) {
    repository(id: $repositoryId) {
      ...BaseRepoDetails
      url
      reviews(first: $first, after: $after) {
        edges {
          node {
            ...BaseReviewDetails
            user {
              ...BaseUserDetails
            }
          }
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`
