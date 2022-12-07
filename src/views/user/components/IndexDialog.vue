<template>
  <el-dialog :title="title" v-model="visible" @open="open()" @close="close()">
    <el-form ref="form" :model="form" :disabled="isView" label-width="80px" size="small">
      <el-form-item label="应用名">
        <el-input v-model="form.appId"></el-input>
      </el-form-item>

      <el-form-item label="名称">
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
      <el-button size="small" @click="close">关 闭</el-button>
      <el-button v-if="!isView" type="primary" size="small" @click="onSubmit()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
const ACTION_TYPE = {
  'add': '新增',
  'edit': '编辑',
  'view': '查看',
}

export default {
  name: 'indexDialog',
  props: {
    value: {
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
    value (val) {
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
      this.$api.user.info(id).then(res => {
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
      this.$emit('input', false)
    },
    onSubmit () {
      let fn = this.isAdd ? 'create' : 'update'

      this.$api.user[fn](this.form).then(res => {
        this.$message({
          type: 'success',
          message: `${this.title}成功`,
        })
        this.close()
        // 刷新列表
        this.$emit('callback')
      })
    },
  },
}
</script>

<style scoped>

</style>
