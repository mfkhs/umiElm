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
  targets: {
    android: 5,
    ios: 7,
    chrome: 58,
    ie: 11,
  },
  ignoreMomentLocale: true,
  antd: {
    dark: true,
    compact: true,
  },
  extraBabelPlugins:[
    ['import', { libraryName: 'antd-mobile', style: true }]  //按需加载antd-mobile样式文件
  ],
});
