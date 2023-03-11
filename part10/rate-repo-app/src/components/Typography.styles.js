import styled from 'styled-components/native'
import theme from '../theme'

const typographyVariants = Object.keys(theme.typography)
// Re-implement: Material UI components
// <Typography variant="subtitle1" sx={} />
export const Typography = styled.Text`
  ${({ variant }) => {
    if (!typographyVariants.includes(variant)) return
    return theme.typography[variant]
  }}
  ${({ sx }) => sx}
`

