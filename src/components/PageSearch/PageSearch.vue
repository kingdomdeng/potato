<!-- 使用：
<PageSearch
    :model="searchForm"
    @search="getTableData"
    :options="[
        { label: '用户名', prop: 'userName', type: 'input' },
        { label: 'IP/设备', prop: 'device', type: 'input' },
        { label: '动作', prop: 'action', type: 'select', data: [
            { label: 'add', value: 'add' },
            { label: 'edit', value: 'edit' },
            { label: 'delete', value: 'delete' },
            { label: 'stop', value: 'stop' },
            { label: 'start', value: 'start' },
        ] },
        { label: '等级', prop: 'level', type: 'checkbox', data: [
            { label: 'info', name: 'level' },
            { label: 'warning', name: 'level' },
            { label: 'success', name: 'level' },
            { label: 'danger', name: 'level' },
        ] },
        { label: '时间', prop: 'datetimerange', type: 'datePicker' },
    ]"
>

  <el-form-item prop="test">
    <el-input v-model="searchForm.test" placeholder="test"/>
  </el-form-item>
</PageSearch>
-->


<script lang="jsx">
import {ref, watch, toRefs} from "vue";
import formCompType from "./formCompType";

export default {
  name: "PageSearch",
  emits: [
    'search',
    'reset',
  ],
  props: {
    model: {
      type: Object
    },
    options: { // TODO: 需要响应式、监听
      type: Array,
      default: [],
    }
  },
  setup(props, { attrs, slots, emit }) {
    const { model } = toRefs(props) // 直接使用props.model不是响应式，具体看api toRefs
    let formRef = ref(null)
    let formModel = ref(null) // 使用reactive需要一个个赋值，ref则直接赋值到value
    formModel.value = model.value

    let attrObj = {
      inline: true,
      size: 'small',
      model: formModel,
      ...attrs
    }

    watch(model, (val) => {
      formModel.value = val
    }, { deep: true })

    const onSearch = () => {
      emit('search')
    }

    const onReset = () => {
      formRef.value.resetFields()
      emit('reset')
    }

    return () => (
        <div className="page-search">
          <el-form ref={formRef} { ...attrObj }>
            {
              props.options.map(item => {
                return formCompType[item.type] && formCompType[item.type](formModel.value, item)
              })
            }

            { slots.default && slots.default() }

            <el-form-item>
              <el-button size="small" type="primary" onClick={ onSearch } plain>查 询</el-button>
              <el-button size="small" onClick={ onReset }>重 置</el-button>
            </el-form-item>
          </el-form>
        </div>
    )
  },
}
</script>
