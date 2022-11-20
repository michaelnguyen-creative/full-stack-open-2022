module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: [
    'react',
  ],
  rules: {
    semi: [
      'error',
      'never',
    ],
    indent: [
      'error',
      2,
    ],
    'no-console': 0,
    'no-undef': 0,
    'no-trailing-spaces': 'error',
    'no-param-reassign': 0,
  },
}
