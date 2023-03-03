import styled from 'styled-components/native'
import theme from '../theme'

// Re-implement: Material UI components
// <Typography variant="subtitle1" sx={} />
export const Typography = styled.Text`
  ${({ variant }) =>
    variant === 'subtitle2'
      ? theme.typography.subtitle2
      : variant === 'body2'
      ? theme.typography.body2
      : variant === 'caption'
      ? theme.typography.caption
      : ''}
  ${({ sx }) => sx}
`

export const TextField = styled.TextInput`
`