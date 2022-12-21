<template>
  <el-dialog v-bind="dialogMixin_dialog">
    <PageForm
        ref="form"
        :model="form"
        :rules="formRules"
        label-width="80px"
        @confirm="confirm"
        @close="$dialogMixin_close"
        :options="[
            { label: '应用名', prop: 'appId', type: 'input' },
            { label: '标题', prop: 'title', type: 'input' },
            { label: '内容', prop: 'content', type: 'input',component: { type: 'textarea', row: 3} },
            { label: '生效时间', prop: 'validTime', type: 'datePicker' },
            { label: '是否禁用', prop: 'disabled', type: 'radio', data: [
                { label: true, border: false, slots: '是' },
                { label: false, border: false, slots: '否' },
            ]},
            { label: '备注', prop: 'remark', type: 'input',component: { type: 'textarea', row: 3} },
          ]"
    ></PageForm>
  </el-dialog>
</template>

<script setup>
import dialogMixin from '@/utils/dialogMixin'
import { formRules } from '../utils/validate'
</script>

<script>
export default {
  name: 'IndexDialog',
  mixins: [dialogMixin],
  expose: [
    'open',
  ],
  data() {
    return {
      form: {
        appId: 1,
        title: '',
        validTime: '',
        content: '',
        disabled: false,
        remark: ''
      },
    }
  },
  created() {

  },
  methods: {
    confirm() {
      let fn = this.dialogMixin_isAdd ? 'create' : 'update'

      this.$api.role[fn](this.form).then(res => {
        this.$message({
          type: 'success',
          message: `${this.dialogMixin_title}成功`,
        })
        this.$dialogMixin_close()
        // 刷新列表
        this.$emit('callback')
      })
    },
    getData (id) {
      this.$api.role.info(id).then(res => {
        this.$dialogMixin_setForm(res.data)
      })
    },
    open({ type, data }) {
      this.$dialogMixin_open({ type, data })

      if (!this.dialogMixin_isAdd) {
        this.getData(data.id)
      }
    },
  },
}
</script>

<style scoped>

</style>
