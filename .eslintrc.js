module.exports = {
  extends: ['prettier', 'eslint:recommended', 'plugin:react/recommended'],
  plugins: ['jest', 'react', 'react-native'],
  env: {
    'jest/globals': true,
    'react-native/react-native': true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
}
