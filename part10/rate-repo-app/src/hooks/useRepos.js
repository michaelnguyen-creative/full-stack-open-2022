import { GET_REPOS } from "../graphql/queries";
import { useQuery } from "@apollo/client";

export const useRepos = (optionVariables) => {
  const { loading, fetchMore, ...result } = useQuery(GET_REPOS, {
    fetchPolicy: 'cache-and-network',
    variables: optionVariables,
    onCompleted: (data) => console.log(data)
  })

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage

    if (!canFetchMore) return

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...optionVariables
      }
    })
  }

  return {
    // respositories: data?.repositories,
    loading,
    fetchMore: handleFetchMore,
    ...result
  }
}

