import { gql } from '@apollo/client'

export const BASE_REPO_DETAILS = gql`
  fragment BaseRepoDetails on Repository {
    id
    fullName
    description
    language
    ownerAvatarUrl
    stargazersCount
    reviewCount
    forksCount
    ratingAverage
  }
`

export const BASE_REVIEW_DETAILS = gql`
  fragment BaseReviewDetails on Review {
    id
    createdAt
    rating
    text
  }
`

export const BASE_USER_DETAILS = gql`
  fragment BaseUserDetails on User {
    id
    username
  }
`
