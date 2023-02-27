import { gql, useMutation } from '@apollo/client'

const AUTH = gql`
  mutation auth($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`

export const useSignIn = () => {
  const [auth, result] = useMutation(AUTH)

  const signIn = async ({ username, password }) =>
    auth({
      variables: {
        credentials: {
          username,
          password,
        },
      },
    })

  return [signIn, result]
}
