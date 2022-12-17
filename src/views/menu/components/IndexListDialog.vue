<template>
  <el-dialog :title="title" v-model="visible" @open="open()" @close="close()">
    <IndexForm :option="option" :show-title="false"></IndexForm>
  </el-dialog>
</template>

<script>
import IndexForm from '@/views/menu/components/IndexForm'

const ACTION_TYPE = {
  'add': '新增',
  'edit': '编辑',
  'view': '查看',
}

export default {
  name: 'IndexListDialog',
  components: {
    IndexForm
  },
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
    }
  },
  watch: {
    modelValue (val) {
      this.visible = val
    },
    type (val) {
      this.title = ACTION_TYPE[val]
    },
  },
  computed: {
    isAdd() {
      return this.type === 'add'
    },
    isView() {
      return this.type === 'view'
    },
  },
  methods: {
    open() {
      this.type = this.option.type
      // this.getAppMenuByAppId()
      // this.form = this.option.data

      if (!this.isAdd) {
        // this.getData(this.option.data.id)
      }
    },
    close() {
      // 重置组件数据
      Object.assign(this.$data, this.$options.data())
      this.$emit('update:modelValue', false)
    },
  },
}
</script>

<style scoped>

</style>
