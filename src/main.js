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
import PageTable from '@/components/PageTable/PageTable'
import PageTableColumn from '@/components/PageTable/PageTableColumn'
import PageTableProps from '@/components/PageTable/PageTableProps'
import PageSearch from '@/components/PageSearch/PageSearch'
import PageContentTool from '@/components/PageContentTool/PageContentTool'
import mouseDirective from '@/utils/mouseDirective'

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
app.component(RenderVNode.name, RenderVNode)
app.component(PageTable.name, PageTable)
app.component(PageTableColumn.name, PageTableColumn)
app.component(PageTableProps.name, PageTableProps)
app.component(PageSearch.name, PageSearch)
app.component(PageContentTool.name, PageContentTool)

app.directive('mouseDirective', mouseDirective)
app.config.globalProperties.$api = api
app.mount('#app')
