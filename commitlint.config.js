
/**
 * 与 git-cz（changelog.config.js）保持一致的类型：
 * build 构建  ci 持续集成  chore 杂项  docs 文档  feat 新功能  fix 修复
 * perf 性能  refactor 重构  revert 回滚  style 格式  test 测试
 */
const Configuration = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test'],
    ],
    'header-max-length': [2, 'always', 100],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
  },
}

module.exports = Configuration