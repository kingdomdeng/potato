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
import {inject, ref, reactive, watch} from "vue";
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
    options: {
      type: Array,
      default: [],
    }
  },
  setup(props, { attrs, slots, emit }) {
    let formRef = ref(null)
    let formModel = props.model // 直接绑定attr.model的话，有可能form重置时，被换了新对象，就监听失败
    let attrObj = {
      inline: true,
      size: 'small',
      model: formModel,
      ...attrs
    }

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
                return formCompType[item.type] && formCompType[item.type](formModel, item)
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
