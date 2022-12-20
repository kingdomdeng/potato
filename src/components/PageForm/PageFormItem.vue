<!--
目的：自定义顺序，配合简化代码
使用：搭配PageForm使用，参数同PageForm
<PageFormItem :option="{ label: '名称', prop: 'name', type: 'input' }"/>
-->

<script lang="jsx">
import {inject} from "vue";
import formCompType from '../PageSearch/formCompType'

export default {
  name: "PageFormItem",
  props: {
    option: {
      type: Object,
      default: {},
    },
  },
  setup(props, { attrs, slots, emit }) {
    const formModel = inject('formModel')
    const isInArr = ['input', 'select'].includes(props.option.type)
    let attrObj = {
      formItem: isInArr ? {label: props.option.label} : null,
      ...props.option
    }

    return () => (
        formCompType[attrObj.type] && formCompType[attrObj.type](formModel, attrObj)
    )
  },
}
</script>
