import { FlatList, View } from "react-native"
import Review from "./Review"
import { WHOAMI } from "../../graphql/queries"
import { useLazyQuery } from "@apollo/client"

const MyReviews = () => {
  return (
    <FlatList
      data={{}}
      renderItem={({ item }) => <Review review={item}/>}
    />
  )
}

export default MyReviews