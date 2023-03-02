import {
  render,
  screen,
  fireEvent,
  waitFor,
  within
} from '@testing-library/react-native'

import { SignInContainer } from '../../../components/SignIn'

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component,
      const onSubmit = jest.fn()
      render(<SignInContainer onSubmit={onSubmit} />)
      // fill the text inputs and press the submit button
      // screen.debug()

      const usernameInput = screen.getByPlaceholderText('Username')
      const passwordInput = screen.getByPlaceholderText('Password')
      const signInButton = screen.getByRole('button')
      
      expect(usernameInput).toBeVisible()
      expect(passwordInput).toHaveProp("name", "password")
      expect(within(signInButton).getByText('Sign in'))
        .toHaveTextContent('Sign in')

      const data = {
        username: "kalle",
        password: "password"
      }

      fireEvent.changeText(usernameInput, data.username)
      fireEvent.changeText(passwordInput, data.password)
      fireEvent.press(signInButton)

      await waitFor(() => {
        expect(onSubmit.mock.calls[0][0]).toEqual(data)
      // expect the onSubmit function to have been called once 
      // and with a correct first argument
      })
    })
  })
})
