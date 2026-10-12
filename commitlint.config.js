export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['init', 'feat', 'fix', 'refactor', 'docs', 'style', 'test', 'chore'],
    ],
    'header-max-length': [2, 'always', 72],
  },
};
