import { defineConfig } from "umi"
import routes from "./config.routes"

export default defineConfig({
  // nodeModulesTransform: {
  //   type: 'none',
  // },
  proxy: {
    '/api': {
      'target': 'http://public-api-v1.aspirantzhang.com',
      'changeOrigin': true,
      'pathRewrite': { '^/api': '' },
    },
  },
  locale: {},
  // fastRefresh: {},
  routes
})