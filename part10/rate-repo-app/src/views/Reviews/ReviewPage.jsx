import ReviewForm from './ReviewForm'
import { useMutation } from '@apollo/client'
import { CREATE_REVIEW } from '../../graphql/mutations'

import { useNavigate } from 'react-router-native'

const ReviewPage = () => {
  const navigate = useNavigate()
  const [mutate] = useMutation(CREATE_REVIEW, {
    onError: (e) => console.log(e),
    onCompleted: (data) => {
      navigate(`/${data.createReview.repositoryId}`)
    },
  })

  const createReview = async ({ rating, ...values }) => {
    console.log('review', values)

    await mutate({
      variables: { review: { rating: parseInt(rating), ...values } },
    })
  }
  return <ReviewForm createReview={createReview} />
}

export default ReviewPage
