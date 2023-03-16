import { GET_REPOSITORIES } from "../graphql/queries";
import { useQuery } from "@apollo/client";

export const useRepositories = (optionVariables) => {
  const { loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: optionVariables,
    // onCompleted: (data) => console.log(data)
  })

  const handleFetchMore = () => {
    const canFetchMore = !loading && result.data?.repositories.pageInfo.hasNextPage
    if (!canFetchMore) return

    fetchMore({
      variables: {
        after: result.data.repositories.pageInfo.endCursor,
        ...optionVariables
      }
    })
  }

  return {
    loading,
    fetchMore: handleFetchMore,
    ...result
  }
}

