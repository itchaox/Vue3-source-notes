/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-07-14 11:06
 * @LastAuthor : wangchao
 * @LastTime   : 2023-07-14 17:16
 * @desc       :
 */
// cz.config.js
/** @type {import('cz-git').CommitizenGitOptions} */
module.exports = {
  alias: { fd: 'docs: fix typos' },
  messages: {
    type: '选择你要提交的类型 :',
    scope: '选择一个提交范围（可选）:',
    subject: '填写简短描述 :\n',
    body: '填写详细描述（可选）。使用 "|" 换行 :\n',
    confirmCommit: '是否提交或修改commit ?',
  },
  types: [
    { value: 'feat', name: 'feat:     新增功能' },
    { value: 'fix', name: 'fix:      修复 bug' },
    { value: 'docs', name: 'docs:     仅仅修改文档' },
    { value: 'style', name: 'style:    仅仅修改了空格、格式缩进等，不改变代码逻辑' },
    { value: 'refactor', name: 'refactor: 代码重构，没有增加新功能或者修复 bug' },
    { value: 'chore', name: 'chore:    改变构建流程，比如增加依赖库、工具等' },
    { value: 'perf', name: 'perf:     优化相关，比如提升性能、体验等' },
    { value: 'test', name: 'test:     测试相关，增加测试用例等' },
    { value: 'revert', name: 'revert:   回滚到上一个版本' },
  ],
  allowCustomScopes: true,
  allowEmptyScopes: true,
  customScopesAlias: '自定义',
  emptyScopesAlias: '空',
  breaklineNumber: 100,
  breaklineChar: '|',
  confirmColorize: true,
  maxHeaderLength: Infinity,
  maxSubjectLength: Infinity,
  minSubjectLength: 0,
  defaultType: 'feat',
};
