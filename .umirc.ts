import { defineConfig } from 'umi';
import routes from './config/config';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  dva: {
    immer: true,
    hmr: true,
  },
  antd: {
    dark: true,
    compact: true,
  },
  extraBabelPlugins:[
    ['import', { libraryName: 'antd-mobile', style: true }]  //按需加载antd-mobile样式文件
  ],
});
