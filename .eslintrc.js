module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'indent': 0,
    'space-before-function-paren': 0,
    'space-in-parens': [0],
    // 禁止使用分号代替ASI(自动分号插入)
    // 'semi': ["error", "always"],
    // semi- spacing：“error:
    "semi-spacing": ["error",
      {
        "before": false,
        "after": true
      }
    ],
    // 逗号间距
    'comma-spacing': [2, { before: false, after: true }],
    'for-direction': 'error',
  }
}
