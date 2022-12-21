<template>
  <div class="page-container">
    <div class="page-content">
      <PageSearch
          :model="searchForm"
          @search="$pageMixin_search"
          :options="[
              { label: '应用ID', prop: 'appId', type: 'input' },
              { label: '标题', prop: 'title', type: 'input' },
              { label: '内容', prop: 'content', type: 'input' },
              { label: '备注', prop: 'remark', type: 'input' },
              { label: '生效对象', prop: 'target', type: 'select', data: [
                  { label: '全部', value: '' },
                  { label: '管理员', value: '管理员' },
                  { label: '员工', value: '员工' },
              ] },
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
          @command="handleCommand"
      ></PageContentTool>

      <PageTable
          :data="tableData"
          :tableProps="tableProps"
          v-bind="pageMixin_table"
      >
        <PageTableColumn type="selection" width="40" fixed/>
        <PageTableColumn type="index" label="#" fixed/>
        <PageTableColumn prop="appId" label="应用ID" fixed/>
        <PageTableColumn prop="title" label="标题" fixed/>
        <PageTableColumn prop="disabled" label="是否禁用">
          <template v-slot="scope">
            {{ scope.row.disabled ? "是" : "否" }}
          </template>
        </PageTableColumn>
        <PageTableColumn prop="content" label="内容" show-overflow-tooltip/>
        <PageTableColumn prop="remark" label="备注" show-overflow-tooltip/>
        <PageTableColumn prop="target" label="生效对象">全体</PageTableColumn>
        <PageTableColumn prop="validTime" label="有效时间" width="180">
          <template v-slot="scope">
            <RenderVNode :vnode="getNoticeProgress(scope.row)"></RenderVNode>
          </template>
        </PageTableColumn>
        <PageTableColumn prop="createTime" label="创建时间" width="180" sortable="custom"/>
        <!--<el-table-column prop="updateTime" label="更新时间" width="180"/>-->
        <PageTableColumn label="操作" width="150" fixed="right">
          <template v-slot="scope">
            <el-button type="primary" text size="small" @click="$pageMixin_dialog('dialog', scope.row)">编辑</el-button>
            <el-button type="primary" text size="small" @click="handleDelete(scope.row.noticeId)">删除</el-button>
          </template>
        </PageTableColumn>
      </PageTable>

      <el-pagination v-bind="pageMixin_pagination" />
    </div>

    <IndexDialog ref="dialog" @callback="$pageMixin_search" />

    <BindMenuDialog
      v-model="bindRoleDialogShow"
      :option="bindRoleDialogOption"
      @callback="getTableData"
    ></BindMenuDialog>
  </div>
</template>

<script lang="jsx" setup>
import { h } from 'vue'
import pageMixin from '@/utils/pageMixin'
import IndexDialog from '@/views/notice/components/IndexDialog'
import BindMenuDialog from '@/views/role/components/BindMenuDialog'
</script>

<script lang="jsx">
export default {
  name: 'Notice',
  mixins: [pageMixin],
  data() {
    return {
      bindRoleDialogShow: false,
      bindRoleDialogOption: {},
      searchForm: {
        appId: '',
        title: '',
        disabled: '',
        content: '',
        remark: '',
        target: '',
        datetimeRange: '',
      },
      tableData: [],
      tableProps: [
        { name: '应用ID', prop: 'appId', fixed: true, default: true, isShow: true },
        { name: '标题', prop: 'title', fixed: false, default: true, isShow: true },
        { name: '是否禁用', prop: 'disabled', fixed: false, default: true, isShow: true },
        { name: '内容', prop: 'content', fixed: false, default: true, isShow: true },
        { name: '备注', prop: 'remark', fixed: false, default: true, isShow: true },
        { name: '生效对象', prop: 'target', fixed: false, default: true, isShow: true },
        { name: '有效时间', prop: 'validTime', fixed: false, default: true, isShow: true },
        { name: '创建时间', prop: 'createTime', fixed: false, default: true, isShow: true },
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

      this.$api.notice.getList(params).then(res => {
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
    },
    getNoticeProgress (item) {
      if (!item.validTime) {
        return null
      }

      let percentage = this.getProcessPercent(item.createTime, item.validTime)
      let status = 0
      let map = {
        0: '未开始',
        1: '进行中',
        2: '已暂停',
      }

      if (percentage) {
        status = 1
      }

      if (item.disabled) {
        status = 2
      }

      if (percentage && (percentage > 100 || percentage < 0)) {
        return null
      }

      let createElement = h
      let vnode = createElement({
        render() {
          return (
            <div>
              <span style="display: block;text-align: center;font-size: 12px;">{ map[status] }</span>
              <el-progress
                text-inside={true}
                stroke-width={16}
                percentage={percentage}
              ></el-progress>
            </div>
          )
        }
      })

      return vnode
    },
    getProcessPercent (createTime, validTime) {
      let [start, end] = validTime
      let now = Date.now()
      start = new Date(start).getTime()
      end = new Date(end).getTime()

      return Math.floor((now - start) / (end - start) * 100)
    },
  }
}
</script>
