<template>
  <div class="page-container page-container-flex">
    <div class="page-content">
      <PageSearch :model="searchForm" @search="getTableData">
        <el-form-item prop="userName">
          <el-input v-model="searchForm.userName" placeholder="用户名"/>
        </el-form-item>

        <el-form-item prop="device">
          <el-input v-model="searchForm.device" placeholder="IP/设备"/>
        </el-form-item>

        <el-form-item prop="action">
          <el-select v-model="searchForm.action" placeholder="动作">
            <el-option label="全部" value=""/>
            <el-option label="add" value="add"/>
            <el-option label="edit" value="edit"/>
            <el-option label="delete" value="delete"/>
            <el-option label="stop" value="stop"/>
            <el-option label="start" value="start"/>
          </el-select>
        </el-form-item>

        <el-form-item label="等级" prop="level">
          <el-checkbox-group v-model="searchForm.level">
            <el-checkbox label="info" name="level" border/>
            <el-checkbox label="warning" name="level" border/>
            <el-checkbox label="success" name="level" border/>
            <el-checkbox label="danger" name="level" border/>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="时间" prop="datetimeRange">
          <el-date-picker
              v-model="searchForm.datetimeRange"
              type="datetimerange"
              :shortcuts="datePicker_shortcuts"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
          />
        </el-form-item>
      </PageSearch>

      <PageContentTool
          :tableProps="tableProps"
          :normalList="[]"
          :dropdownList="[]"
      ></PageContentTool>

      <PageTable :data="tableData" :tableProps="tableProps" :row-class-name="tableRowClassName">
        <PageTableColumn type="index" label="#" fixed/>
        <PageTableColumn prop="userName" label="用户名" fixed/>
        <PageTableColumn prop="action" label="动作"/>
        <PageTableColumn prop="level" label="等级"/>
        <PageTableColumn prop="device" label="IP/设备" fixed/>
        <PageTableColumn prop="createTime" label="创建时间" width="180"/>
        <!--<el-table-column prop="updateTime" label="更新时间" width="180"/>-->
        <PageTableColumn label="操作" width="100" fixed="right">
          <template v-slot="scope">
            <el-button type="primary" text size="small" @click="openDialog('edit', scope.row)">详情</el-button>
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

    <IndexDialog v-model="dialogShow" :option="dialogOption"></IndexDialog>
  </div>
</template>

<script lang="jsx" setup>
import pageMixin from '@/utils/pageMixin'
import { datePicker_shortcuts } from '@/utils/datePicker'
import IndexDialog from '@/views/log/components/IndexDialog'
</script>

<script lang="jsx">
export default {
  name: 'Log',
  mixins: [pageMixin],
  data () {
    return {
      dialogShow: false,
      dialogOption: {},
      searchForm: {
        userName: '',
        action: '',
        datetimeRange: '',
        device: '',
        level: [],
      },
      tableData: [],
      tableProps: [
        { name: '用户名', prop: 'userName', fixed: true, default: true, isShow: true },
        { name: '动作', prop: 'action', fixed: false, default: true, isShow: true },
        { name: '等级', prop: 'level', fixed: false, default: true, isShow: true },
        { name: 'IP/设备', prop: 'device', fixed: false, default: true, isShow: true },
        { name: '创建时间', prop: 'createTime', fixed: false, default: false, isShow: true },
      ],
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    getTableData () {
      let params = {
        ...this.pageMixin_params
      }

      this.$api.log.getList(params).then(res => {
        this.tableData = res.data.list
        this.$pageMixin_set(res.data.page)
      })
    },
    openDialog (type, data) {
      this.dialogShow = true
      this.dialogOption = {
        type,
        data: JSON.parse(JSON.stringify(data))
      }
    },
    tableRowClassName({row, rowIndex}) {
      return `${ row.level }-row`
    },
  }
}
</script>

<style lang="scss" scoped>
  :deep() {
    .el-table tr {
      &.success-row, &.success-row .el-table__cell {
        //background-color: #d1edc4!important;
        background-color: #e1f3d8!important;
      }

      &.info-row, &.info-row .el-table__cell {
        //background-color: #dedfe0!important;
        background-color: #e9e9eb!important;
      }

      &.warning-row, &.warning-row .el-table__cell {
        //background-color: #f8e3c5!important;
        background-color: #faecd8!important;
      }

      &.danger-row, &.danger-row .el-table__cell {
        //background-color: #fcd3d3!important;
        background-color: #fde2e2!important;
      }
    }
  }
</style>
