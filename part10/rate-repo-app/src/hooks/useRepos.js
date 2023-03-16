import { GET_REPOS } from "../graphql/queries";
import { useQuery } from "@apollo/client";

export const useRepos = (optionVariables) => {
  const { loading, fetchMore, ...result } = useQuery(GET_REPOS, {
    fetchPolicy: 'cache-and-network',
    variables: optionVariables,
    onCompleted: (data) => console.log(data)
  })

  const handleFetchMore = () => {
    const canFetchMore = !loading && result.data?.repositories.pageInfo.hasNextPage

    if (!canFetchMore) return

    // console.log('ec', result.data.repositories.pageInfo.endCursor)
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

