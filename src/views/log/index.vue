<template>
  <div class="page-container page-container-flex">
    <!--<div class="page-tool">
      <el-button type="primary" @click="openDialog('add', {})">新增</el-button>
    </div>-->

    <div class="page-content">
      <el-table :data="tableData" :row-class-name="tableRowClassName" style="width: 100%" border>
        <el-table-column type="index" label="#" fixed/>
        <el-table-column prop="userName" label="用户名" fixed/>
        <el-table-column prop="action" label="动作"/>
        <el-table-column prop="level" label="等级"/>
        <el-table-column prop="device" label="IP/设备" fixed/>
        <el-table-column prop="createTime" label="创建时间" width="180"/>
        <!--<el-table-column prop="updateTime" label="更新时间" width="180"/>-->
        <el-table-column label="操作" width="100" fixed="right">
          <template v-slot="scope">
            <el-button type="primary" text size="small" @click="openDialog('edit', scope.row)">详情</el-button>
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

    <IndexDialog v-model="dialogShow" :option="dialogOption"></IndexDialog>
  </div>
</template>

<script lang="jsx">
import pageMixin from '@/utils/pageMixin'
import IndexDialog from '@/views/log/components/IndexDialog'

export default {
  name: 'Log',
  mixins: [pageMixin],
  components: {
    IndexDialog,
  },
  data () {
    return {
      dialogShow: false,
      dialogOption: {},
      tableData: [],
      tableProps: [
        { name: '用户名', prop: 'userName', fixed: false, default: true },
        { name: '动作', prop: 'action', fixed: false, default: true },
        { name: '等级', prop: 'level', fixed: false, default: true },
        { name: 'IP/设备', prop: 'device', fixed: false, default: true },
        { name: '创建时间', prop: 'createTime', fixed: false, default: true },
      ],
    }
  },
  created () {
    // this.getTableData()
    let levelArr = ['success','info','warning','danger']
    let actionArr = ['add','edit','delete','stop','start']

    let i = 0
    while (i < 10) {
      this.tableData.push({
        userName: `用户${ i }`,
        action: actionArr[Math.floor(Math.random()*5)], // add/edit/delete/stop/start
        level: levelArr[Math.floor(Math.random()*4)], // success/info/warning/danger
        device: `8.8.8.8 / 谷歌浏览器`,
        createTime: '2022-12-07 10:10:00',
      })
      i++
    }
  },
  methods: {
    getTableData () {
      let params = {
        keyword: '',
        ...this.pageMixin_params
      }

      this.$api.role.getList(params).then(res => {
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
