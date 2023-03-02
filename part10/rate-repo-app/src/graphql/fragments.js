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
