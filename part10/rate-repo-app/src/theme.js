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
    h1: {
      fontFamily,
      fontSize: 96,
      fontWeight: fontWeights.light,
      letterSpacing: -1.5
    },
    h2: {
      fontFamily,
      fontSize: 60,
      fontWeight: fontWeights.light,
      letterSpacing: -0.5
    },
    h3: {
      fontFamily,
      fontSize: 48,
      fontWeight: fontWeights.regular,
      letterSpacing: 0
    },
    h4: {
      fontFamily,
      fontSize: 34,
      fontWeight: fontWeights.regular,
      letterSpacing: 0.25
    },
    h5: {
      fontFamily,
      fontSize: 24,
      fontWeight: fontWeights.regular,
      letterSpacing: 0
    },
    h6: {
      fontFamily,
      fontSize: 20,
      fontWeight: fontWeights.medium,
      letterSpacing: 0.15
    },
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
    button: {
      fontFamily,
      fontSize: 14,
      fontWeight: fontWeights.medium,
      letterSpacing: 1.25
    },
    caption: {
      fontFamily,
      fontSize: 12,
      fontWeight: fontWeights.regular,
      letterSpacing: 0.4
    },
    overline: {
      fontFamily,
      fontSize: 10,
      fontWeight: fontWeights.regular,
      letterSpacing: 1.5
    }
  },
  // Re-implement: Material Design / Color System
  colors: {
    // Primary color: Purple 
    primary: {
      // Primary variants: Dark & Light
      dark: '#6200EE',
      variant1: '#3700B3'
    },
    secondary: {
      // Primary variants: Dark & Light
      dark: '#03DAC5',
    },
    ui: {
      background: '#FFFFFF',
      surface: 'whitesmoke',
      error: ''
    },
    on: {
      onPrimary: {
        onDark: '#FFFFFF',
      },
      onSecondary: {
        onDark: '#000000',
      },
      onBackground: '#000000',
      onSurface: '#000000',
      onError: '#FFFFFF'
    }
  },
}

export default theme
