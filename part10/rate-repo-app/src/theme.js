import { Platform } from 'react-native'

const { fontFamily } = Platform.select({
  android: {
    fontFamily: 'Roboto'
  },
  ios: {
    fontFamily: 'Arial'
  },
  default: {
    fontFamily: 'System'
  }
})

const fontWeights = {
  light: 400,
  regular: 500,
  medium: 600,
  bold: 700,
}

const theme = {
  // Re-implement: Material Design / Typography / Type System
  typography: {
    /// Variants: h1, h2, h3...subtitle1...body1
    subtitle1: {
      fontFamily,
      fontSize: 16,
      fontWeight: fontWeights.regular,
      letterSpacing: 0.15
    },
    subtitle2: {
      fontFamily,
      fontSize: 14,
      fontWeight: fontWeights.medium,
      letterSpacing: 0.1
    },
    body1: {
      fontFamily,
      fontSize: 16,
      fontWeight: fontWeights.regular,
      letterSpacing: 0.5
    },
    body2: {
      fontFamily,
      fontSize: 14,
      fontWeight: fontWeights.regular,
      letterSpacing: 0.25
    },
    caption: {
      fontFamily,
      fontSize: 12,
      fontWeight: fontWeights.regular,
      letterSpacing: 0.4
    }
  },
  // Re-implement: Material Design / Color System
  colors: {
    primary: {
      // Variants = dark + light
      dark: '#24292e',
      light: {},
      ui: {
        background: '#0366d6',
        surface: '',
        error: ''
      }
    },
    secondary: {
      dark: '#586069',
      light: {},
      ui: {
        background: '',
        surface: '',
        error: ''
      }
    },
    on: {
      onPrimary: {
        onDark: '#FFFFFF',
        onLight: '#24292e'
      },
      onSecondary: {
        onDark: '#586069',
        onLight: '#000000'
      },
      onBackground: '#000000',
      onSurface: '#000000',
      onError: '#FFFFFF'
    }
  },
}

export default theme
