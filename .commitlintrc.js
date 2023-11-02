module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 80],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'release',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'revert',
        'ci',
        'build',
        'hotfix',
      ],
    ],
  },
}
