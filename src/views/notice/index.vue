<template>
  <div class="page-container">
    <div class="page-content">
      <PageSearch :model="searchForm" @search="$pageMixin_search">
        <el-form-item prop="appId">
          <el-input v-model="searchForm.appId" placeholder="应用ID"/>
        </el-form-item>

        <el-form-item prop="title">
          <el-input v-model="searchForm.title" placeholder="标题"/>
        </el-form-item>

        <el-form-item prop="content">
          <el-input v-model="searchForm.content" placeholder="内容"/>
        </el-form-item>

        <el-form-item prop="remark">
          <el-input v-model="searchForm.remark" placeholder="备注"/>
        </el-form-item>

        <el-form-item prop="target">
          <el-select v-model="searchForm.target" placeholder="生效对象">
            <el-option label="全部" value=""/>
            <el-option label="add" value="add"/>
            <el-option label="edit" value="edit"/>
            <el-option label="delete" value="delete"/>
          </el-select>
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
        <PageTableColumn label="操作" width="200" fixed="right">
          <template v-slot="scope">
            <el-button type="primary" text size="small" @click="openDialog('edit', scope.row)">编辑</el-button>
            <el-button type="primary" text size="small" @click="handleDelete(scope.row.noticeId)">删除</el-button>
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

<script lang="jsx" setup>
import { h } from 'vue'
import pageMixin from '@/utils/pageMixin'
import { datePicker_shortcuts } from '@/utils/datePicker'
import IndexDialog from '@/views/notice/components/IndexDialog'
import BindMenuDialog from '@/views/role/components/BindMenuDialog'
</script>

<script lang="jsx">
export default {
  name: 'Notice',
  mixins: [pageMixin],
  data () {
    return {
      dialogShow: false,
      dialogOption: {},
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
  created () {
    this.getTableData()
  },
  methods: {
    getTableData () {
      let params = {
        ...this.searchForm,
        ...this.pageMixin_params
      }

      this.$api.notice.getList(params).then(res => {
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
