module.exports = {
  'env': {
    'browser': true,
    'es2020': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended'
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': { 'jsx': true },
    'ecmaVersion': 'latest',
    'sourceType': 'module',
    'project': "./tsconfig.json"
  },
  'plugins': [
    'react',
    '@typescript-eslint',
    'jsx-a11y',
    'react-hooks'
  ],
  'rules': {
    'indent': [
      'error',
      2
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    'no-trailing-spaces': [
      'error',
      {
        'skipBlankLines': true,
        'ignoreComments': true
      }
    ],
    '@typescript-eslint/ban-ts-comment': 'off',
    'react/no-unknown-property': ['error', { ignore: ['styleName'] }],
    'jsx-quotes': ['error', 'prefer-double'],
    'react/jsx-boolean-value': ['error', 'never'],
    'react-hooks/rules-of-hooks': 'warn',
    'react-hooks/exhaustive-deps': 'warn'
  }
};
