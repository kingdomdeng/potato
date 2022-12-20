<template>
  <div class="page-container page-container-flex">
    <div class="page-content">
      <PageSearch
          :model="searchForm"
          @search="$pageMixin_search"
          :options="[
              { label: '名称', prop: 'name', type: 'input' },
              { label: '分支', prop: 'branch', type: 'input' },
              { label: '操作人', prop: 'operator', type: 'input' },
              { label: '环境', prop: 'development', type: 'select', data: [
                  { label: '全部', value: '' },
                  { label: '正式环境', value: 'prd' },
                  { label: '预发环境', value: 'pre' },
                  { label: '测试环境', value: 'test' },
                  { label: '开发环境', value: 'dev' },
              ] },
              { label: '状态', prop: 'status', type: 'select', data: [
                  { label: '全部', value: '' },
                  { label: '启动中', value: 'starting' },
                  { label: '运行中', value: 'running' },
                  { label: '暂停中', value: 'stopping' },
                  { label: '已暂停', value: 'stopped' },
                  { label: '失败', value: 'failure' },
              ] },
              { label: '时间', prop: 'datetimeRange', type: 'datePicker' },
          ]"
      ></PageSearch>

      <PageContentTool
          :tableProps="tableProps"
          :isDisabledBatch="!pageMixin_selected.length"
          @command="handleCommand"
      ></PageContentTool>

      <PageTable
          :data="tableData"
          :tableProps="tableProps"
          v-bind="pageMixin_table"
      >
        <PageTableColumn type="selection" width="40" fixed/>
        <PageTableColumn type="index" label="#" fixed/>
        <PageTableColumn prop="name" label="名称" fixed/>
        <PageTableColumn prop="development" label="环境" fixed/>
        <PageTableColumn prop="branch" label="分支"/>
        <PageTableColumn prop="operator" label="操作人" fixed/>
        <PageTableColumn prop="status" label="状态"/>
        <PageTableColumn prop="createTime" label="创建时间" width="180" sortable="custom"/>
        <PageTableColumn prop="createTime" label="更新时间" width="180" sortable="custom"/>
        <PageTableColumn label="操作" width="150" fixed="right">
          <template v-slot="scope">
            <el-button type="primary" text size="small" @click="openDialog('edit', scope.row)">编辑</el-button>
            <el-button type="primary" text size="small" @click="showDetails = true">运行</el-button>
            <el-button type="primary" text size="small" @click="handleDelete(scope.row.noticeId)">删除</el-button>
          </template>
        </PageTableColumn>
      </PageTable>

      <el-pagination v-bind="pageMixin_pagination" />
    </div>

    <IndexDialog
      v-model="dialogShow"
      :option="dialogOption"
      @callback="$pageMixin_search"
    ></IndexDialog>

    <Details v-model="showDetails"></Details>
  </div>
</template>

<script lang="jsx" setup>
import pageMixin from '@/utils/pageMixin'
import IndexDialog from '@/views/pipeline/components/IndexDialog'
import Details from '@/views/pipeline/Details'
</script>

<script lang="jsx">
export default {
  name: 'Pipeline',
  mixins: [pageMixin],
  data() {
    return {
      showDetails: false,
      dialogShow: false,
      dialogOption: {},
      searchForm: {
        name: '',
        branch: '',
        operator: '',
        development: '',
        status: '',
        datetimeRange: '',
      },
      tableData: [],
      tableProps: [
        { name: '名称', prop: 'name', fixed: true, default: true, isShow: true },
        { name: '环境', prop: 'development', fixed: false, default: true, isShow: true },
        { name: '分支', prop: 'branch', fixed: false, default: true, isShow: true },
        { name: '操作人', prop: 'operator', fixed: false, default: true, isShow: true },
        { name: '状态', prop: 'status', fixed: false, default: true, isShow: true },
        { name: '创建时间', prop: 'createTime', fixed: false, default: true, isShow: true },
        { name: '更新时间', prop: '更新时间', fixed: false, default: true, isShow: true },
      ],
    }
  },
  created() {
    this.getTableData()
  },
  mounted() {
    setTimeout(() => {
      this.showDetails = true
    })
  },
  methods: {
    getTableData() {
      let params = {
        ...this.searchForm,
        ...this.pageMixin_params
      }

      this.$api.pipeline.getList(params).then(res => {
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
    handleCommand(command) {
      let map = {
        add: () => this.openDialog('add', {}),
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
  }
}
</script>
