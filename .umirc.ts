import { defineConfig } from 'umi';
import routes from './config/config';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
});
