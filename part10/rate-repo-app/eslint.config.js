export default [
  {
    plugins: ['react', 'react-native'],
    settings: {
      react: {
        version: 'detect'
      }
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parser: '@babel/eslint-parser',
    env: {
      'react-native/react-native': true
    },
    rules: {
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off'
    }
  }
]