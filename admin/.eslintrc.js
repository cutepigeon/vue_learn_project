module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parser: "vue-eslint-parser",
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars':[2,{
      "vars":"local",//允许声明未使用变量
      "args":"none"//参数不检查
    }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
