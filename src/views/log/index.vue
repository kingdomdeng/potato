<template>
  <div class="page-container page-container-flex">
    <div class="page-content">
      <PageSearch
          :model="searchForm"
          @search="getTableData"
          :options="[
              { label: '用户名', prop: 'userName', type: 'input' },
              { label: 'IP/设备', prop: 'device', type: 'input' },
              { label: '动作', prop: 'action', type: 'select', data: [
                  { label: 'add', value: 'add' },
                  { label: 'edit', value: 'edit' },
                  { label: 'delete', value: 'delete' },
                  { label: 'stop', value: 'stop' },
                  { label: 'start', value: 'start' },
              ] },
              { label: '等级', prop: 'level', type: 'checkbox', data: [
                  { label: 'info', name: 'level' },
                  { label: 'warning', name: 'level' },
                  { label: 'success', name: 'level' },
                  { label: 'danger', name: 'level' },
              ] },
              { label: '时间', prop: 'datetimeRange', type: 'datePicker' },
          ]"
      ></PageSearch>

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
        <PageTableColumn prop="num" label="千分位数字" thousands fixed/>
        <PageTableColumn prop="createTime" label="创建时间" width="180"/>
        <!--<el-table-column prop="updateTime" label="更新时间" width="180"/>-->
        <PageTableColumn label="操作" width="100" fixed="right">
          <template v-slot="scope">
            <el-button type="primary" text size="small" @click="openDialog('edit', scope.row)">详情</el-button>
          </template>
        </PageTableColumn>
      </PageTable>

      <el-pagination v-bind="pageMixin_pagination" />
    </div>

    <IndexDialog v-model="dialogShow" :option="dialogOption"></IndexDialog>
  </div>
</template>

<script lang="jsx" setup>
import pageMixin from '@/utils/pageMixin'
import IndexDialog from '@/views/log/components/IndexDialog'
</script>

<script lang="jsx">
export default {
  name: 'Log',
  mixins: [pageMixin],
  data() {
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
  created() {
    this.getTableData()
  },
  methods: {
    getTableData() {
      let params = {
        ...this.searchForm,
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
