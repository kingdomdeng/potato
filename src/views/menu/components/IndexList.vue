<template>
  <div class="page-container">
    <!--<div class="page-tool">
      <el-link
        type="primary"
        href="/api/menu/download"
        download="菜单权限"
        target="_blank"
      >下载全部</el-link>
    </div>-->

    <div class="page-content">
      <PageSearch
          :model="searchForm"
          @search="$pageMixin_search"
          :options="[
              { label: '应用ID', prop: 'appId', type: 'input' },
              { label: '名称', prop: 'name', type: 'input' },
              { label: '备注', prop: 'remark', type: 'input' },
              { label: '禁用', prop: 'disabled', type: 'radio', data: [
                  { label: '全部', name: '' },
                  { label: '是', name: 'true' },
                  { label: '否', name: 'false' },
              ] },
              { label: '时间', prop: 'datetimeRange', type: 'datePicker' },
          ]"
      ></PageSearch>

      <PageContentTool
          :tableProps="tableProps"
          :isDisabledBatch="!pageMixin_selected.length"
          :dropdownList="[]"
          downloadLink="/api/menu/download"
          @command="handleCommand"
      ></PageContentTool>

      <PageTable
          :data="tableData"
          :tableProps="tableProps"
          v-bind="pageMixin_table"
          style="width: 100%"
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
       <PageTableColumn label="操作" width="150" fixed="right">
          <template v-slot="scope">
            <el-button type="primary" text size="small" @click="$pageMixin_dialog('dialog', scope.row)">编辑</el-button>
            <el-button type="primary" text size="small" @click="handleDelete(scope.row.menuId)">删除</el-button>
          </template>
        </PageTableColumn>
      </PageTable>

      <el-pagination v-bind="pageMixin_pagination" />
    </div>

    <IndexListDialog ref="dialog" @callback="$pageMixin_search" />
  </div>
</template>

<script setup>
import pageMixin from '@/utils/pageMixin'
import IndexListDialog from '@/views/menu/components/IndexListDialog'
</script>

<script>
export default {
  name: 'IndexList',
  mixins: [pageMixin],
  data() {
    return {
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
  created() {
    this.getTableData()
  },
  methods: {
    getTableData() {
      let params = {
        ...this.searchForm,
        ...this.pageMixin_params
      }

      this.$api.menu.getList(params).then(res => {
        this.tableData = res.data.list
        this.$pageMixin_set(res.data.page)
      })
    },
    handleCommand(command) {
      let map = {
        add: () => this.$pageMixin_dialogAdd('dialog'),
        batchDelete: () => {
          console.log(this.pageMixin_selected)
        }
      }

      map[command] && map[command]()
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

<style scoped>

</style>
