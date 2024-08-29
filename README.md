Admin-Fast
精简后台模板

前端技术选型：Vite、Vue3、TS、Arco Design、
后端：Node、Nest、Mysql、

#### Husky Lint-staged

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
