import { useQuery } from "@apollo/client"
import { GET_REPOSITORY } from "../graphql/queries"

export const useRepository = (optionVariables) => {
  const { loading, refetch, fetchMore, ...result } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: optionVariables,
    onError: (e) => console.log(e),
    onCompleted: (data) => console.log(data)
  })

  const handleReviewsFetchMore = () => {
    const canFetchMore = !loading && result.data?.repository.reviews.pageInfo.hasNextPage
    if (!canFetchMore) return

    fetchMore({
      variables: {
        after: result.data.repository.reviews.pageInfo.endCursor,
        ...optionVariables
      }
    })
  }

  return {
    loading,
    refetch,
    fetchMoreReviews: handleReviewsFetchMore,
    ...result
  }
}