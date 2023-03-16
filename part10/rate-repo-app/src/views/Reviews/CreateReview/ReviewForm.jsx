import { Formik } from 'formik'
import { Button, View, StyleSheet } from 'react-native'
import { FormikTextInput } from '../../../components'
import * as yup from 'yup'

const reviewFormInitialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
}

const reviewSchema = yup.object({
  ownerName: yup.string().required(),
  repositoryName: yup.string().required(),
  rating: yup.number().min(0).max(100),
  text: yup.string(),
})

const ReviewForm = ({ createReview }) => {
  return (
    <Formik
      initialValues={reviewFormInitialValues}
      onSubmit={createReview}
      validationSchema={reviewSchema}
    >
      {({ submitForm }) => (
        <View style={{ padding: '5%'}}>
          <FormikTextInput
            name="ownerName"
            placeholder="Repo owner name"
          ></FormikTextInput>
          <FormikTextInput
            name="repositoryName"
            placeholder="Repo name"
          ></FormikTextInput>
          <FormikTextInput
            name="rating"
            placeholder="Rating between 0 and 100"
            keyboardType="numeric"
          ></FormikTextInput>
          <FormikTextInput
            name="text"
            placeholder="Review"
            multiline
          ></FormikTextInput>
          <Button title="Create a review" onPress={() => submitForm()}></Button>
        </View>
      )}
    </Formik>
  )
}


const styles = StyleSheet.create({

})

export default ReviewForm
