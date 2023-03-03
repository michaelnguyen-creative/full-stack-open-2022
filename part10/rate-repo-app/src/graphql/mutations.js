import { gql } from '@apollo/client'
import { BASE_REVIEW_DETAILS } from './fragments'

export const AUTH = gql`
mutation auth($credentials: AuthenticateInput) {
  authenticate(credentials: $credentials) {
    accessToken
  }
}
`

export const CREATE_REVIEW = gql`
  ${BASE_REVIEW_DETAILS}
  mutation createReview($review: CreateReviewInput) {
    createReview(review: $review) {
      ...BaseReviewDetails
      repositoryId
    }
  }
`