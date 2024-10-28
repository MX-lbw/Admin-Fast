// @see: http://eslint.cn

import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'


export default [
  {files: ["**/*.{js,mjs,cjs,ts,vue}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {files: ["**/*.vue"], languageOptions: {parserOptions: {parser: tseslint.parser}}},
  {
    /**
     * "off" 或 0    ==>  关闭规则
     * "warn" 或 1   ==>  打开的规则作为警告[不影响代码执行]
     * "error" 或 2  ==>  规则作为一个错误[代码不能执行，界面报错]
     */
    rules: {
      // eslint (http://eslint.cn/docs/rules)   eslint配置
      // semi: ["error", "always"],

      // typeScript (https://typescript-eslint.io/rules)  ts配置
      "no-var": "error", // 要求使用 let 或 const 而不是 var
      "@typescript-eslint/no-explicit-any": "error", // 禁止使用 any 类型

      // vue (https://eslint.vuejs.org/rules)  vue配置
      "vue/no-v-html": "error", // 禁止使用 v-html
    },
  },
  //自动合并prettier.config.js配置
  eslintPluginPrettierRecommended
];
