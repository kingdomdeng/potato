<template>
  <el-dialog :title="title" v-model="visible" @open="open()" @close="close()">
    <el-form ref="form" :model="form" :disabled="isView" label-width="80px">
      <el-form-item label="应用名">
        <el-input v-model="form.appId" disabled></el-input>
      </el-form-item>

      <el-form-item label="名称">
        <el-input v-model="form.name" disabled></el-input>
      </el-form-item>

      <el-form-item label="角色">
        <el-tree
          ref="tree"
          :data="treeMixin_treeList"
          node-key="menuId"
          show-checkbox
          default-expand-all
          :default-checked-keys="treeMixin_menuSelected"
          :props="{
            // disabled: 'isDisabled',
            children: 'children',
            label: 'name'
          }"
        ></el-tree>
      </el-form-item>

    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="close">关 闭</el-button>
      <el-button v-if="!isView" type="primary" @click="onSubmit()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import treeMixin from '@/utils/treeMixin'
const ACTION_TYPE = {
  // 'add': '新增',
  'edit': '编辑角色菜单',
  // 'view': '查看',
}

export default {
  name: 'BindMenuDialog',
  mixins: [treeMixin],
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
        appId: 1,
        roleId: '',
        menuIds: [],
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
  methods: {
    open() {
      // 1.获取应用所有角色
      // 2.获取用户角色
      let { appId, roleId } = this.option.data
      this.type = this.option.type
      this.form = this.option.data

      this.$treeMixin_getAppMenuByAppId(appId)
      this.$treeMixin_findRoleMenu(appId, roleId)
    },
    close() {
      // 重置组件数据
      Object.assign(this.$data, this.$options.data())
      this.$emit('update:modelValue', false)
    },
    onSubmit() {
      let menuIds = this.$refs.tree.getCheckedKeys()
      let params = {
        appId: this.form.appId,
        roleId: this.form.roleId,
        menuIds: menuIds,
      }

      this.$api.role.bindMenu(params).then(res => {
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
