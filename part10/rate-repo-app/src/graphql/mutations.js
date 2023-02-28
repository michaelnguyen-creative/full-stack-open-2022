import { gql } from '@apollo/client'

export const AUTH = gql`
mutation auth($credentials: AuthenticateInput) {
  authenticate(credentials: $credentials) {
    accessToken
  }
}
`