/**
 * git-cz 交互式提交配置：中文提示 + 图标 + 与 commitlint 一致的规范
 * 使用方式：pnpm commit 或 npx git-cz
 */
module.exports = {
  disableEmoji: false,
  format: '{type}{scope}: {emoji}{subject}',
  list: ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'ci', 'chore', 'revert'],
  maxMessageLength: 72,
  minMessageLength: 2,
  questions: ['type', 'scope', 'subject', 'body', 'breaking', 'issues'],
  scopes: [],
  types: {
    feat: {
      description: '新功能',
      emoji: '✨',
      value: 'feat',
    },
    fix: {
      description: '修复 Bug',
      emoji: '🐛',
      value: 'fix',
    },
    docs: {
      description: '仅文档变更',
      emoji: '📝',
      value: 'docs',
    },
    style: {
      description: '代码风格、格式、空格等（不影响逻辑）',
      emoji: '💄',
      value: 'style',
    },
    refactor: {
      description: '重构（既不是新功能也不是修 Bug）',
      emoji: '♻️',
      value: 'refactor',
    },
    perf: {
      description: '性能优化',
      emoji: '⚡️',
      value: 'perf',
    },
    test: {
      description: '测试相关',
      emoji: '🧪',
      value: 'test',
    },
    build: {
      description: '构建系统或外部依赖变更',
      emoji: '📦',
      value: 'build',
    },
    ci: {
      description: 'CI 配置或脚本变更',
      emoji: '🔧',
      value: 'ci',
    },
    chore: {
      description: '杂项（不影响主流程）',
      emoji: '🔨',
      value: 'chore',
    },
    revert: {
      description: '回滚某次提交',
      emoji: '⏪',
      value: 'revert',
    },
  },
  messages: {
    type: '选择本次提交的类型：',
    customScope: '选择或输入影响范围（可选）：',
    subject: '简短描述本次修改（必填）：',
    body: '详细描述（可选，换行以写多行）：',
    breaking: '列出破坏性变更（可选）：',
    issues: '关联的 Issue，如 #123（可选）：',
    confirmCommit: '确认以上提交信息？',
  },
}
