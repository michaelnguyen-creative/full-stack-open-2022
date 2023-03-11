import { useMutation, useApolloClient } from '@apollo/client'
import { useAuthStorage } from './useAuthStorage'
import { AUTH } from '../graphql/mutations'

export const useSignIn = () => {
  const authStorage = useAuthStorage()
  const [auth, result] = useMutation(AUTH)
  const client = useApolloClient()

  const signIn = async ({ username, password }) => {
    const {
      data: {
        authenticate: { accessToken },
      },
    } = await auth({
      variables: {
        credentials: {
          username,
          password,
        },
      },
    })
    await authStorage.setAccessToken(accessToken)
    client.resetStore()
  }

  return [signIn, result]
}
