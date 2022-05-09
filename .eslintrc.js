module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': ['error', { allow: [ 'error'] }],
    'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
  },
};
