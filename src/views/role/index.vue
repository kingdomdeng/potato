<template>
  <div class="page-container">
    <div class="page-content">
      <PageSearch :model="searchForm" @search="$pageMixin_search">
        <el-form-item prop="appId">
          <el-input v-model="searchForm.appId" placeholder="应用ID"/>
        </el-form-item>

        <el-form-item prop="name">
          <el-input v-model="searchForm.name" placeholder="名称"/>
        </el-form-item>

        <el-form-item prop="remark">
          <el-input v-model="searchForm.remark" placeholder="备注"/>
        </el-form-item>

        <el-form-item label="禁用" prop="disabled">
          <el-radio-group v-model="searchForm.disabled">
            <el-radio label="全部" name="" border/>
            <el-radio label="是" name="true" border/>
            <el-radio label="否" name="false" border/>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="时间" prop="datetimeRange">
          <el-date-picker
              v-model="searchForm.datetimeRange"
              :shortcuts="datePicker_shortcuts"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
          />
        </el-form-item>
      </PageSearch>

      <PageContentTool
          :tableProps="tableProps"
          :isDisabledBatch="!pageMixin_selected.length"
          :dropdownList="[]"
          downloadLink="/api/role/download"
          @command="handleCommand"
      ></PageContentTool>

      <PageTable
          :data="tableData"
          :tableProps="tableProps"
          :default-sort="pageMixin_defaultSort"
          @selection-change="$pageMixin_selection"
          @sort-change="$pageMixin_sort"
      >
        <PageTableColumn type="selection" width="40" fixed/>
        <PageTableColumn type="index" label="#" fixed/>
        <PageTableColumn prop="appId" label="应用ID" fixed/>
        <PageTableColumn prop="name" label="名称" fixed/>
        <PageTableColumn prop="disabled" label="是否禁用">
          <template v-slot="scope">
            {{ scope.row.disabled ? "是" : "否" }}
          </template>
        </PageTableColumn>
        <PageTableColumn prop="remark" label="备注" show-overflow-tooltip/>
        <PageTableColumn prop="createTime" label="创建时间" width="180" sortable="custom"/>
        <PageTableColumn prop="updateTime" label="更新时间" width="180" sortable="custom"/>
       <PageTableColumn label="操作" width="200" fixed="right">
          <template v-slot="scope">
            <el-button type="primary" text size="small" @click="openDialog('edit', scope.row.roleId)">编辑</el-button>
            <el-button type="primary" text size="small" @click="openBindMenuDialog(scope.row)">菜单</el-button>
            <el-button type="primary" text size="small" @click="handleDelete(scope.row.roleId)">删除</el-button>
          </template>
        </PageTableColumn>
      </PageTable>

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

    <BindMenuDialog
      v-model="bindRoleDialogShow"
      :option="bindRoleDialogOption"
      @callback="getTableData"
    ></BindMenuDialog>
  </div>
</template>

<script setup>
import pageMixin from '@/utils/pageMixin'
import { datePicker_shortcuts } from '@/utils/datePicker'
import IndexDialog from '@/views/role/components/IndexDialog'
import BindMenuDialog from '@/views/role/components/BindMenuDialog'
</script>

<script>
export default {
  name: 'Role',
  mixins: [pageMixin],
  data () {
    return {
      dialogShow: false,
      dialogOption: {},
      bindRoleDialogShow: false,
      bindRoleDialogOption: {},
      searchForm: {
        appId: '',
        name: '',
        disabled: '',
        remark: '',
        datetimeRange: '',
      },
      tableData: [],
      tableProps: [
        { name: '应用ID', prop: 'appId', fixed: true, default: true, isShow: true },
        { name: '名称', prop: 'name', fixed: true, default: true, isShow: true },
        { name: '是否禁用', prop: 'disabled', fixed: false, default: true, isShow: true },
        { name: '备注', prop: 'remark', fixed: false, default: true, isShow: true },
        { name: '创建时间', prop: 'createTime', fixed: false, default: true, isShow: true },
        { name: '更新时间', prop: 'updateTime', fixed: false, default: true, isShow: true },
      ],
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    getTableData () {
      let params = {
        ...this.searchForm,
        ...this.pageMixin_params
      }

      this.$api.role.getList(params).then(res => {
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
    handleCommand(command) {
      let map = {
        add: () => this.openDialog('add'),
        batchDelete: () => {
          console.log(this.pageMixin_selected)
        }
      }

      map[command] && map[command]()
    },
    handleDelete (id) {
      this.$api.role.remove(id).then(res => {
        if (res.data) {
          this.$message.success('删除成功')
          this.getTableData()
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    openBindMenuDialog (menuDo) {
      this.bindRoleDialogShow = true
      this.bindRoleDialogOption = {
        type: 'edit',
        data: {
          ...menuDo
        }
      }
    }
  }
}
</script>
