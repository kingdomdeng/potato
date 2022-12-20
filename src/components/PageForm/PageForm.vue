<!-- 使用：
<PageForm
  :model="form"
  :rules="formRules"
  label-width="80px"
  :options="[
      { label: '名称', prop: 'name', type: 'input' },
      { label: '分支', prop: 'branch', type: 'input' },
      { label: '环境', prop: 'development', type: 'select', data: [
          { label: '全部', value: '' },
          { label: '正式环境', value: 'prd' },
          { label: '预发环境', value: 'pre' },
          { label: '测试环境', value: 'test' },
          { label: '开发环境', value: 'dev' },
      ] },
  ]"
>
  <el-form-item label="名称test" prop="test">
    <el-input v-model="form.test"></el-input>
  </el-form-item>
</PageForm>-->

<script lang="jsx">
import {provide, ref} from "vue";
import formCompType from '../PageSearch/formCompType'

export default {
  name: "PageForm",
  emits: [
    'confirm',
    'close',
  ],
  props: {
    model: {
      type: Object
    },
    options: {
      type: Array,
      default: [],
    },
    verify: {
      type: Boolean,
      default: true,
    }
  },
  setup(props, { attrs, slots, emit }) {
    let formRef = ref(null)
    let formModel = props.model // 直接绑定attr.model的话，有可能form重置时，被换了新对象，就监听失败
    let attrObj = {
      // inline: true,
      model: formModel,
      ...attrs
    }

    provide('formModel', formModel)

    function validate(cb) {
      formRef.value.validate((valid) => {
        if (valid) {
          cb()
        }
      })
    }

    const onConfirm = () => {
      if (props.verify) {
        validate(() => {
          emit('confirm')
        })
      } else {
        emit('confirm')
      }
    }

    const onClose = () => {
      formRef.value.resetFields()
      emit('close')
    }

    return () => (
        <el-form ref={formRef} { ...attrObj }>
          {
            props.options.map(item => {
              // 补充input、select的label
              if (['input', 'select'].includes(item.type)) {
                item.formItem = {
                  label: item.label,
                  ...item.formItem
                }
              }

              return formCompType[item.type] && formCompType[item.type](formModel, item)
            })
          }

          { slots.default && slots.default() }

          <el-form-item>
            <el-button type="primary" onClick={ onConfirm }>确 定</el-button>
            <el-button onClick={ onClose }>关 闭</el-button>
          </el-form-item>
        </el-form>
    )
  }
}
</script>

<style scoped>

</style>
