import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import api from './api/index'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import './assets/main.css'
import './assets/style/global.scss'

import globalInstall from '@/components/index'

if (import.meta.env.MODE === 'mock') {
  import('@/configs/mock')
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
  size: 'default'
})

// 全局组件
app.use(globalInstall)

app.config.globalProperties.$api = api
app.mount('#app')
