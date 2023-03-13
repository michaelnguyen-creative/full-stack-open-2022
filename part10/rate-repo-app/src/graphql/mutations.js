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

export const CREATE_USER = gql`
  mutation createUser($user: CreateUserInput) {
    createUser(user: $user) {
      username
      createdAt
    }
  }
`

export const DELETE_REVIEW = gql`
  mutation deleteReview($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`