<template>
  <el-dialog :title="title" v-model="visible" @open="open()" @close="close()" width="960px">
    <div class="content">
      <div class="content-left">
        <el-form ref="form" :model="form" :disabled="isView" label-width="80px">
          <el-form-item label="应用名">
            <el-input v-model="form.appId" disabled></el-input>
          </el-form-item>

          <el-form-item label="名称">
            <el-input v-model="form.name" disabled></el-input>
          </el-form-item>

          <el-form-item label="角色">
            <el-select
              v-model="treeMixin_roleSelected"
              multiple
              placeholder="请选择"
              style="width: 100%"
              @change="handleChange"
            >
              <el-option
                v-for="item in treeMixin_roleList"
                :key="item.roleId"
                :label="item.name"
                :value="item.roleId"
              ></el-option>
            </el-select>
          </el-form-item>

        </el-form>
      </div>

      <div class="content-right">
        <el-tree
          ref="tree"
          :data="treeMixin_treeList"
          node-key="menuId"
          show-checkbox
          default-expand-all
          :default-checked-keys="treeMixin_userMenuList"
          :props="{
            disabled: 'isDisabled',
            children: 'children',
            label: 'name'
          }"
        ></el-tree>
      </div>
    </div>

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
  'edit': '编辑用户角色',
  // 'view': '查看',
}

export default {
  name: 'BindRoleDialog',
  mixins: [treeMixin],
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
        userId: '',
        roleIds: [],
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
  methods: {
    handleChange () {
      let { appId } = this.option.data
      let roleIds = this.treeMixin_roleSelected.join(',')

      this.$treeMixin_findRoleMenu(appId, roleIds).then(res => {
        this.$refs.tree.setCheckedKeys(this.treeMixin_menuSelected)
      })
    },
    open () {
      // 1.获取应用所有菜单
      // 2.获取角色菜单
      let { appId, userId } = this.option.data
      this.type = this.option.type

      this.form = this.option.data
      // 获取角色
      this.$treeMixin_getAppRoleByAppId(appId)
      this.$treeMixin_findUserRole(appId, userId)

      // 获取菜单
      this.$treeMixin_getAppMenuByAppId(appId, true)
      this.$treeMixin_findUserMenu(appId, userId)
    },
    close () {
      // 重置组件数据
      Object.assign(this.$data, this.$options.data())
      this.$emit('update:modelValue', false)
    },
    onSubmit () {
      let params = {
        appId: this.form.appId,
        userId: this.form.userId,
        roleIds: this.treeMixin_roleSelected,
      }

      this.$api.role.bindUser(params).then(res => {
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

<style lang="scss" scoped>
  .content {
    display: flex;
    .content-left {
      width: 400px;
    }

    .content-right {
      flex: 1;
      margin-left: $m;
      background: #f2f5f7;

     :deep() {
        .el-tree {
          background: inherit;
        }

        .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
          background-color: #409EFF;
          border-color: #409EFF;
        }

        .el-checkbox__input.is-disabled .el-checkbox__inner::after {
          border-color: #fff;
        }
      }
    }
  }
</style>
