import { StyleSheet } from 'react-native'
import { FormikTextInput } from '../../../components/Formik/FormikTextInput'
import { FormikBaseForm } from '../../../components/Formik/FormikBaseForm'
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
    <FormikBaseForm
      initialValues={reviewFormInitialValues}
      onSubmit={createReview}
      validationSchema={reviewSchema}
      submitButtonLabel="Create a review"
    >
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
    </FormikBaseForm>
  )
}

const styles = StyleSheet.create({})

export default ReviewForm
