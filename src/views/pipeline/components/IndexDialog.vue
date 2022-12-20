<template>
  <el-dialog :title="title" v-model="visible" @open="open()" @close="close()">
    <PageForm
        :model="form"
        :rules="formRules"
        label-width="80px"
        @confirm="confirm"
        @close="close"
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
    >
    </PageForm>
  </el-dialog>
</template>

<script setup>
import { formRules } from '../utils/validate'
</script>

<script>
const ACTION_TYPE = {
  'add': '新增',
  'edit': '编辑',
  'view': '查看',
}

export default {
  name: 'IndexDialog',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    option: Object
  },
  data() {
    return {
      title: '',
      type: '',
      visible: false,
      form: {
        name: '',
        branch: '',
        git: '',
        order: '',
        development: '',
      },
    }
  },
  watch: {
    modelValue (val) {
      this.visible = val
    },
    type (val) {
      this.title = ACTION_TYPE[val]
    }
  },
  computed: {
    isAdd() {
      return this.type === 'add'
    },
    isView() {
      return this.type === 'view'
    }
  },
  created() {
    // 动态创建的首次需要用到
    // this.visible = this.value
    // this.open()
  },
  methods: {
    confirm() {
      console.log('### submit')
    },
    getData (id) {
      this.$api.role.info(id).then(res => {
        this.form = res.data
      })
    },
    setForm (data) {
      Object.assign(this.$data.form, this.$options.data().form)

      Object.keys(data).forEach(attr => {
        if (this.form.hasOwnProperty(attr)) {
          this.form[attr] = data[attr]
        }
      })
    },
    open() {
      this.type = this.option.type
      this.setForm(this.option.data)

      // if (!this.isAdd) {
      //   this.getData(this.option.data.id)
      // }
    },
    close() {
      // 重置组件数据
      Object.assign(this.$data, this.$options.data())
      // this.$refs.form && this.$refs.form.resetFields()
      this.$emit('update:modelValue', false)
    },
    onSubmit() {
      this.verify().then(() => {
        let fn = this.isAdd ? 'create' : 'update'

        this.$api.role[fn](this.form).then(res => {
          this.$message({
            type: 'success',
            message: `${this.title}成功`,
          })
          this.close()
          // 刷新列表
          this.$emit('callback')
        })
      }).catch(() => {})
    },
    verify() {
      let form = this.$refs.form
      return new Promise((res, rej) => {
        form.validate((valid) => {
          if (valid) {
            res(true)
          } else {
            rej(false)
          }
        })
      })
    }
  },
}
</script>

<style scoped>

</style>
