Admin-Fast
精简后台模板

前端技术选型：Vite、Vue3、TS、Arco Design、
后端：Node、Nest、Mysql、

#### 一.Husky https://typicode.github.io/husky/zh/
> 是一个Git 钩子工具，它允许你在Git 仓库中定义脚本，在特定的Git 事件发生时自动执行这些脚本。
#### 二.Lint-staged https://github.com/lint-staged/lint-staged
> lint-staged 是一个在git 暂存文件上（也就是被 git add 的文件）运行已配置的linter（或其他）任务。
#### 三.Commitlint https://commitlint.js.org/
> commitlint 是一个用于检查 git commit -m 信息是否符合规范的工具。
##### 3.1 cz-git https://cz-git.qbb.sh/zh/
> 是一个基于 commitlint 的工具，它可以帮助你在提交代码时自动生成符合规范的 commit 信息。工程性更强，轻量级，高度自定义.
#### 四.Prettier https://www.prettier.cn/
> prettier 是一个代码格式化工具，它可以自动将代码格式化为统一的风格，从而提高代码的可读性和可维护性。
#### 五.Eslint https://eslint.nodejs.cn/
> eslint 是一个代码检查工具，它可以检查代码中的语法错误、代码风格错误等问题，并给出相应的提示
#### 六.Stylelint https://stylelint.io/
>一个 CSS 代码检查工具，它可以检查 CSS 代码中的语法错误、代码风格错误等问题，并给出相应的提示。
#### 七.Editorconfig https://editorconfig.org/
> 是一个代码风格规范的工具，它可以帮助开发者在不同的编辑器中保持一致的代码风格，从而提高代码的可读性和可维护性。
```
1.pnpm lint-staged husky -D

2.配置package.json文件
"prepare": "husky install"
执行 npm run prepare, 将husky安装完毕

3.添加pre-commit钩子
版本：8.x.x.x
 一般添加的是lint-staged，对git暂存区的代码做一些格式化的操作
npx husky add .husky/pre-commit "npx lint-staged"
版本：9.x.x.x
出现add command is DEPRECATED
使用npx husky init
echo "npx lint-staged" > .husky/pre-commit

4.package.json文件中，添加文件匹配的执行规则
"lint-staged": {
    "*.{js,ts,jsx,tsx}": [
      "prettier --write",
      "eslint --fix"
    ],
    "*.vue": [
      "stylelint --fix",
      "prettier --write",
      "eslint --fix"
    ],
    "*.{html,less,css}": [
      "stylelint --fix",
      "prettier --write"
    ],
    "package.json": [
      "prettier --write"
    ],
    "*.md": [
      "prettier --write"
    ]
  },
```
