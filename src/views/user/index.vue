<template>
  <div class="page-container">
    <div class="page-tool">
      <el-button type="primary" @click="openDialog('add')">新增</el-button>
      <el-link
        type="primary"
        href="/api/menu/download"
        download="平台用户"
        target="_blank"
      >下载全部</el-link>
    </div>

    <div class="page-content">
      <el-table :data="tableData" style="width: 100%" max-height="500" border>
        <el-table-column type="index" label="#" fixed/>
        <el-table-column prop="appId" label="应用ID" fixed/>
        <el-table-column prop="name" label="名称" fixed/>
        <el-table-column prop="disabled" label="是否禁用">
          <template v-slot="scope">
            {{ scope.row.disabled ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"/>
        <el-table-column prop="createTime" label="创建时间" width="180"/>
        <el-table-column prop="updateTime" label="更新时间" width="180"/>
       <el-table-column label="操作" width="200" fixed="right">
          <template v-slot="scope">
            <el-button type="primary" text size="small" @click="openDialog('edit', scope.row.userId)">编辑</el-button>
            <el-button type="primary" text size="small" @click="openBindRoleDialog(scope.row)">角色</el-button>
            <el-button type="primary" text size="small" @click="handleDelete(scope.row.userId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        :layout="pageMixin_layout"
        :total="pageMixin_pageTotal"
        :page-sizes="pageMixin_pageSizes"
        :page-size="pageMixin_params.pageSize"
        :current-page="pageMixin_params.pageCurrent"
        @size-change="$pageMixin_sizeChange"
        @current-change="$pageMixin_currentChange"
      />
    </div>

    <IndexDialog
      v-model="dialogShow"
      :option="dialogOption"
      @callback="$pageMixin_search"
    ></IndexDialog>

    <BindRoleDialog
      v-model="bindRoleDialogShow"
      :option="bindRoleDialogOption"
      @callback="getTableData"
    ></BindRoleDialog>
  </div>
</template>

<script>
import pageMixin from '@/utils/pageMixin'
import IndexDialog from '@/views/user/components/IndexDialog'
import BindRoleDialog from '@/views/user/components/BindRoleDialog'

export default {
  name: 'User',
  mixins: [pageMixin],
  components: {
    IndexDialog,
    BindRoleDialog,
  },
  data () {
    return {
      dialogShow: false,
      dialogOption: {},
      bindRoleDialogShow: false,
      bindRoleDialogOption: {},
      tableData: [],
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    getTableData () {
      let params = {
        keyword: '',
        ...this.pageMixin_params
      }

      this.$api.user.getList(params).then(res => {
        this.tableData = res.data.list
        this.$pageMixin_set(res.data.page)
      })
    },
    openDialog (type, id) {
      this.dialogShow = true
      this.dialogOption = {
        type,
        data: {
          id
        }
      }
    },
    handleDelete (id) {
      this.$api.user.remove(id).then(res => {
        if (res.data) {
          this.$message.success('删除成功')
          this.getTableData()
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    openBindRoleDialog (roleDo) {
      this.bindRoleDialogShow = true
      this.bindRoleDialogOption = {
        type: 'edit',
        data: {
          ...roleDo
        }
      }
    },
  }
}
</script>
