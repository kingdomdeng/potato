import RenderVNode from './RenderVNode'
import PageTable from './PageTable/PageTable'
import PageTableColumn from './PageTable/PageTableColumn'
import PageTableProps from './PageTable/PageTableProps'
import PageSearch from './PageSearch/PageSearch'
import PageContentTool from './PageContentTool/PageContentTool'
import PageForm from './PageForm/PageForm'
import PageFormItem from './PageForm/PageFormItem'
import PageDrawer from './PageDrawer/PageDrawer'
import mouseDirective from '@/utils/mouseDirective'

export default {
  install(app, options) {
    let components = [
      RenderVNode,
      PageTable,
      PageTableColumn,
      PageTableProps,
      PageSearch,
      PageContentTool,
      PageForm,
      PageFormItem,
      PageDrawer,
    ]
    
    const directives = [
      mouseDirective
    ]
  
    // 注册全局组件和全局指令
    components.forEach(item => {
      app.component(item.name, item)
    })
  
    directives.forEach(item => {
      app.directive(item.name, item)
    })
  }
}
