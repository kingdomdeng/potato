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
            { label: '名称', prop: 'name', type: 'input' },
            { label: '分支', prop: 'branch', type: 'input' },
            { label: 'git地址', prop: 'git', type: 'input' },
            { label: '打包命令', prop: 'order', type: 'input',component: { type: 'textarea', row: 3} },
            { label: '部署环境', prop: 'development', type: 'select', data: [
                { label: '全部', value: '' },
                { label: '正式环境', value: 'prd' },
                { label: '预发环境', value: 'pre' },
                { label: '测试环境', value: 'test' },
                { label: '开发环境', value: 'dev' },
            ] },
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
        name: '',
        branch: '',
        git: '',
        order: '',
        development: '',
      },
    }
  },
  created() {

  },
  methods: {
    confirm() {
      console.log('### submit')
    },
    getData (id) {
      this.$api.user.info(id).then(res => {
        this.$dialogMixin_setForm(res.data)
      })
    },
    onSubmit() {
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
  },
}
</script>

<style scoped>

</style>
