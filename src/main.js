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

import RenderVNode from '@/components/RenderVNode'
import mouseDirective from '@/utils/mouseDirective'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
  size: 'default'
})
app.component(RenderVNode.name, RenderVNode)
app.directive('mouseDirective', mouseDirective)
app.config.globalProperties.$api = api

app.mount('#app')
