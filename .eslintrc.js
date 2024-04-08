module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      files: ['**/*.test.js', '**/*.test.ts', '**/*.test.tsx', '**/*.stories.*'],
      // env: {
      //   jest: true // now **/*.test.js files' env has both es6 *and* jest
      // },
      // // Can't extend in overrides: https://github.com/eslint/eslint/issues/8813
      // // "extends": ["plugin:jest/recommended"]
      // plugins: ['jest'],
      // rules: {
      //   'jest/no-disabled-tests': 'warn',
      //   'jest/no-focused-tests': 'error',
      //   'jest/no-identical-title': 'error',
      //   'jest/prefer-to-have-length': 'warn',
      //   'jest/valid-expect': 'error',
      //   'import/no-anonymous-default-export': 'off'
      // }
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  rules: {
    '@typescript-eslint/naming-convention': [
      'error',
      { selector: 'typeLike', format: ['PascalCase'] },
    ],
    'no-console': 'error',
    'linebreak-style': 'off',
    'import/extensions': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'import/no-unresolved': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/no-deprecated': 'warn',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'react/prop-types': 'off',
    'react/no-unstable-nested-components': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-param-reassign': ['error', { props: false }],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
