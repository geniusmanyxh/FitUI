
/**
 * build：用于构建系统或外部依赖的更改，例如构建脚本、配置文件等。

chore：用于常规维护任务和零星任务，不影响主要功能的更改。

ci：用于持续集成（CI）配置和脚本的更改。

docs：用于文档的更改，例如更新文档、添加注释、撰写README等。

feat：表示添加新特性或功能。

fix：用于修复bug或错误。

perf：用于性能优化的更改。

refactor：表示代码重构，通常不涉及新功能或修复错误，而是改进代码质量、可读性或结构。

revert：用于撤销先前的提交，通常指向被撤销的提交的哈希值。

style：用于对代码风格和格式的更改，如代码缩进、空格、命名规范等。

test：表示与测试相关的更改，包括添加、修改或删除测试用例。
 */
const Configuration = {
  extends: ['@commitlint/config-conventional'],
  // parserPreset: 'conventional-changelog-atom', // 解析器预设
  // formatter: '@commitlint/format', // 消息格式化程序
  // rules: {
  //   'type-enum': [2, 'always', [
  //     'build',
  //     'chore',
  //     'ci',
  //     'docs',
  //     'feat',
  //     'fix',
  //     'perf',
  //     'refactor',
  //     'revert',
  //     'style',
  //     'test',]],
  // },
}

module.exports = Configuration