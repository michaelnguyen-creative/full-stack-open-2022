import { FlatList, View } from "react-native"
import Review from "./Review"

const MyReviews = () => {
  return (
    <FlatList
      data={{}}
      renderItem={({ item }) => <Review review={item}/>}
    />
  )
}

export default MyReviews