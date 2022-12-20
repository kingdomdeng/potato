import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const zlib = require('node:zlib');

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
      },
      '/proxyRes': {
        target: 'http://test.com',
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/^\/proxyRes/, '')
        },
        configure: (proxy, options) => {
          options.selfHandleResponse = true // 自定义响应必须设置true
  
          proxy.on('proxyRes', (proxyRes, req, res) => {
            let body = [];
            let totalLength = 0;
            
            proxyRes.on('data', function (chunk) {
              totalLength += chunk.length
              body.push(chunk);
            });
            
            proxyRes.on('end', async function () {
              let buf = Buffer.concat(body, totalLength);
              
              // 解压、修改内容、压缩、重写头部、传送
              const newBuf =await zlib.brotliDecompressSync(buf)
              let str = newBuf.toString()
              str = str.replace(/test/g, 'testReplace')
              let result =await zlib.brotliCompressSync(str)
             
              res.writeHead(200, proxyRes.headers)
              res.end(result)
            });
          })
        },
      },
    }
  }
})
