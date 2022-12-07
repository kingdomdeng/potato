import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/style/variables.scss";`
      },
    },
  },
  plugins: [
    vue(),
    vueJsx()
  ],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: '9090',
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        /*pathRewrite: {
          '^/api': '',
        },*/
        rewrite: (path) => path.replace(/^\/api/, ''),
        router: {
          'dev.localhost:9090': 'http://localhost:8000',
        },
      }
    }
  }
})
