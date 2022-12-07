<template>
  <div class="page-container">
    <div class="page-content menu-tree-content">
      <div class="menu-tree-left">
        <div class="menu-tree-header">
          <el-select v-model="appSelected" placeholder="请选择" size="small" @change="refresh">
            <el-option
              v-for="item in appList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>

          <div class="tool">
            <el-button size="small" icon="el-icon-plus" title="新增" @click="handleAppend">
              <!--新增-->
            </el-button>
          </div>
        </div>

        <el-tree
          :data="treeMixin_treeList"
          node-key="menuId"
          default-expand-all
          :expand-on-click-node="false"
          @node-click="handleEdit"
          v-slot="{ node, data }"
        >
          <span class="menu-tree-node">
            <span class="name">{{ data.name }}</span>
            <span class="tool">
              <el-button size="small" icon="el-icon-plus" title="新增" @click.stop="handleAppend(data)">
                <!--新增-->
              </el-button>
              <el-button size="small" icon="el-icon-edit" title="编辑" @click.stop="handleEdit(data)">
                <!--编辑-->
              </el-button>
              <el-button size="small" icon="el-icon-minus" title="删除" @click.stop="handleDelete(data.menuId)">
                <!--删除-->
              </el-button>
            </span>
          </span>
        </el-tree>
      </div>

      <div class="menu-tree-right">
        <IndexForm :option="indexFormOption" @callback="refresh"></IndexForm>
      </div>
    </div>
  </div>
</template>

<script>
import treeMixin from '@/utils/treeMixin'
import IndexForm from '@/views/menu/components/IndexForm'

export default {
  name: 'IndexTree',
  mixins: [treeMixin],
  components: {
    IndexForm
  },
  data () {
    return {
      appSelected: 1,
      appList: [
        { name: '应用1', id: 1 },
        { name: '应用2', id: 2 },
        { name: '应用3', id: 3 },
      ],
      indexFormOption: {}
    }
  },
  created () {
    this.refresh()
  },
  methods: {
    refresh () {
      this.$treeMixin_getAppMenuByAppId(this.appSelected)

      this.handleAppend()
    },
    handleAppend (data = {}) {
      this.indexFormOption = {
        type: 'add',
        data: {
          appId: this.appSelected,
          parentId: data.menuId
        }
      }
    },
    handleEdit (data) {
      this.indexFormOption = {
        type: 'edit',
        data: {
          ...data
        }
      }
    },
    handleDelete (id) {
      this.$api.menu.remove(id).then(res => {
        if (res.data) {
          this.$message.success('删除成功')
          this.getTableData()
        } else {
          this.$message.error('删除失败')
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.menu-tree-content {
  display: flex;

  .menu-tree-left {
    width: 300px;

    .menu-tree-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0 5px;
      border-bottom: 1px solid #eaeaea;

      h4 {
        flex: 1;
        margin: 0;
        font: $ft14;
        font-weight: normal;
      }

     :deep() .el-select {
        width: 100px;
      }

      .tool {
       :deep() {
          .el-button {
            padding: 0;
            width: 18px;
            height: 18px;
            line-height: 18px;
          }
        }
      }
    }

    .menu-tree-node {
      flex: 1;
      display: flex;

      .name {
        flex: 1;
      }

      &:hover {
        .tool {
          display: block;
        }
      }

      .tool {
        display: none;
        //width: 80px;

       :deep() {
          .el-button {
            padding: 0;
            width: 18px;
            height: 18px;
            line-height: 18px;
          }

          .el-button+.el-button {
            margin-left: 5px;
          }
        }
      }
    }
  }

  .menu-tree-right {
    flex: 1;
    margin-left: $m;
    background: #f2f5f7;
  }
}
</style>
