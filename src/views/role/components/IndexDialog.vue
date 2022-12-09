<template>
  <el-dialog :title="title" v-model="visible" @open="open()" @close="close()">
    <el-form ref="form" :model="form" :rules="formRules" :disabled="isView" label-width="80px">
      <el-form-item label="应用名" prop="appId">
        <el-input v-model="form.appId"></el-input>
      </el-form-item>

      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="是否禁用">
        <el-radio-group v-model="form.disabled">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.remark" :rows="3"></el-input>
      </el-form-item>

    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="close">关 闭</el-button>
      <el-button v-if="!isView" type="primary" @click="onSubmit()">确 定</el-button>
    </div>
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
  data () {
    return {
      title: '',
      type: '',
      visible: false,
      form: {
        appId: 1,
        name: '',
        disabled: false,
        remark: ''
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
    isAdd () {
      return this.type === 'add'
    },
    isView () {
      return this.type === 'view'
    }
  },
  created () {
    // 动态创建的首次需要用到
    // this.visible = this.value
    // this.open()
  },
  methods: {
    getData (id) {
      this.$api.role.info(id).then(res => {
        this.form = res.data
      })
    },
    open () {
      this.type = this.option.type
      // this.form = this.option.data

      if (!this.isAdd) {
        this.getData(this.option.data.id)
      }
    },
    close () {
      // 重置组件数据
      Object.assign(this.$data, this.$options.data())
      this.$refs.form && this.$refs.form.resetFields()
      this.$emit('update:modelValue', false)
    },
    onSubmit () {
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
