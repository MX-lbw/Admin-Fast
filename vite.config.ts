import { defineConfig,loadEnv,ConfigEnv,UserConfig } from "vite";
import * as path from "path";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ArcoResolver } from "unplugin-vue-components/resolvers";
import { vitePluginForArco } from "@arco-plugins/vite-vue";
// 生成环境移除console
import removeConsole from "vite-plugin-remove-console";
// keepAlive 组件name
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
//打包分析
import { visualizer } from 'rollup-plugin-visualizer';
// gzip压缩
//import viteCompression from "vite-plugin-compression";
// 数据mock配置
import { viteMockServe } from "vite-plugin-mock";
// 代码检查
import eslintPlugin from 'vite-plugin-eslint';
//Vue 开发调试定位工具
import VueDevToolsPlugin from 'vite-plugin-vue-devtools';
//@see  https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig =>{
// 环境变量
const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue', 'vue-router'],
        resolvers: [ArcoResolver()],
      }),
      Components({
        resolvers: [
          ArcoResolver({
            sideEffect: true,
          }),
        ],
      }),
      vitePluginForArco({
        style: "css",
      }),
      viteMockServe({
        mockPath: "mock", //设置模拟数据的存储文件夹
        logger: true, //是否在控制台显示请求日志
        enable: command === "serve", //设置是否启用本地 xxx.ts 文件，不要在生产环境中打开它.设置为 false 将禁用 mock 功能
      }),
      eslintPlugin({
        include: ['src/**/*.js', 'src/**/*.vue', 'src/**/*.ts'],    // 指定需要检查的文件
        exclude: ['node_modules/**', 'dist/**'],    // 指定不需要检查的文件
        fix: true,    // 是否自动修复
        cache: false    // 是否启用缓存
      }),
      visualizer(),
      removeConsole(),
      VueSetupExtend(),
      VueDevToolsPlugin({
        launchEditor: 'webstorm',
      })
    ],
    css:{
      // 预处理器配置项
      preprocessorOptions:{
        scss:{
          // additionalData: `@import "@/assets/styles/global.scss";`
        }
      }
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "Components": path.resolve(__dirname, 'src/components'),
      },
    },
    server:{
      port: 5730, // 端口号
      host: true,
      open: true,
      proxy: {
        // 代理跨域
        [env.VITE_WEB_BASE_API]: {
          target: env.VITE_WEB_BASE_URL,
          // 允许跨域
          changeOrigin: true,
          rewrite: path => path.replace(new RegExp("^" + env.VITE_WEB_BASE_API), ""), // 路径重写，例如：将路径中包含dev-api字段替换为空。注意：只有请求真实后端接口才会有用，使用mock接口还是得带koi
        },
      },
    },

  }
}
);
