import { View, Text } from 'react-native'
import { render, screen } from '@testing-library/react-native'

describe('example', () => {
  it('works', function() {
    expect(1).toBe(1)
  })
})

const Greeting = ({ name }) => {
  return (
    <View>
      <Text>Hello {name}</Text>
    </View>
  )
}

describe('Greeting', function() {
  it('renders a greeting message', function() {
    render(<Greeting name="Michael" />)
    screen.debug()
    expect(screen.getByText('Hello Michael')).toBeDefined()
  })
})