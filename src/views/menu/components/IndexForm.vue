<template>
  <div class="index-form">
    <h4>{{ title }}</h4>

    <el-form ref="form" :model="form" :disabled="isView" label-width="100px" size="small">
      <el-form-item label="应用名">
        <el-input v-model="form.appId"></el-input>
      </el-form-item>

      <el-form-item label="菜单名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="父级菜单">
        <el-select v-model="form.parentId" placeholder="请选择" style="width: 100%" clearable>
          <!--<el-option label="空" value=""></el-option>-->
          <el-option
            v-for="item in menuListComputed"
            :key="item.menuId"
            :label="item.name"
            :value="item.menuId"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="图标">
        <el-input v-model="form.icon"></el-input>
      </el-form-item>

      <el-form-item label="url">
        <el-input v-model="form.url"></el-input>
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

      <el-form-item label="">
        <el-button v-if="!isView" type="primary" size="small" @click="onSubmit()">确 定</el-button>
        <el-button size="small" @click="close">取 消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const ACTION_TYPE = {
  'add': '新增',
  'edit': '编辑',
  'view': '查看',
}

export default {
  name: 'IndexForm',
  props: {
    option: Object
  },
  data () {
    return {
      type: 'add',
      form: {
        appId: null,
        menuId: null,
        name: '',
        parentId: '',
        icon: '',
        url: '',
        disabled: false,
        remark: ''
      },
      menuList: []
    }
  },
  watch: {
    value (val) {
      this.visible = val
    },
    option: {
      deep: true,
      handler (val) {
        this.type = val.type
        this.setForm(val.data)
      }
    },
    'form.appId': {
      immediate: true,
      handler () {
        this.getAppMenuByAppId()
      }
    }
  },
  computed: {
    title () {
      return ACTION_TYPE[this.type]
    },
    isAdd () {
      return this.type === 'add'
    },
    isView () {
      return this.type === 'view'
    },
    menuListComputed () {
      // 过滤本身 & 子孙
      return this.filterDescendant(this.menuList, 'menuId', 'parentId', this.form.menuId)
    }
  },
  methods: {
    filterDescendant (list, attr, parentAttr, filterId) {
      let newList = list.filter(a => a[attr] !== filterId)
      let children = list.filter(a => a[parentAttr] === filterId)

      if (children && children.length) {
        children.forEach(item => {
          newList = this.filterDescendant(newList, attr, parentAttr, item[attr])
        })
      }

      return newList
    },
    getAppMenuByAppId () {
      if (!this.form.appId) return

      let params = {
        appId: this.form.appId,
      }

      this.$api.menu.getAppMenuByAppId(params).then(res => {
        this.menuList = res.data
      })
    },
    getData (id) {
      this.$api.menu.info(id).then(res => {
        this.form = res.data
      })
    },
    setForm (data) {
      Object.assign(this.$data.form, this.$options.data().form)

      Object.keys(data).forEach(attr => {
        if (this.form.hasOwnProperty(attr)) {
          this.$set(this.form, attr, data[attr])
        }
      })
    },
    close () {
      // 重置组件数据
      Object.assign(this.$data, this.$options.data())
      this.$emit('input', false)
    },
    onSubmit () {
      let fn = this.isAdd ? 'create' : 'update'

      this.$api.menu[fn](this.form).then(res => {
        this.$message({
          type: 'success',
          message: `${this.title}成功`,
        })
        this.close()
        // 刷新列表
        this.$emit('callback')
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  .index-form {
    h4 {
      margin: 0;
      padding: $p;
      font-size: $ft16;
      color: $fc6;
    }

   :deep() {
      .el-form {
        max-width: 600px;
      }
    }
  }
</style>
