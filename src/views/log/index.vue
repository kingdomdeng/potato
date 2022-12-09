<template>
  <div class="page-container">
    <div class="page-tool">
      <el-button type="primary" @click="openDialog('add', {})">新增</el-button>
    </div>

    <div class="page-content">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="index" label="#" fixed/>
        <el-table-column prop="appId" label="应用ID" fixed/>
        <el-table-column prop="title" label="标题" fixed/>
        <el-table-column prop="disabled" label="是否禁用">
          <template v-slot="scope">
            {{ scope.row.disabled ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column prop="content" label="内容"/>
        <el-table-column prop="remark" label="备注"/>
        <el-table-column prop="target" label="生效对象">全体</el-table-column>
        <el-table-column prop="validTime" label="有效时间" width="180">
          <template v-slot="scope">
            <RenderVNode :vnode="getNoticeProgress(scope.row)"></RenderVNode>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180"/>
        <!--<el-table-column prop="updateTime" label="更新时间" width="180"/>-->
       <el-table-column label="操作" width="200" fixed="right">
          <template v-slot="scope">
            <el-button type="primary" text size="small" @click="openDialog('edit', scope.row)">编辑</el-button>
            <!--<el-button type="primary" text size="small" @click="openBindMenuDialog(scope.row)">菜单</el-button>-->
            <el-button type="primary" text size="small" @click="handleDelete(scope.row.noticeId)">删除</el-button>
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

    <BindMenuDialog
      v-model="bindRoleDialogShow"
      :option="bindRoleDialogOption"
      @callback="getTableData"
    ></BindMenuDialog>
  </div>
</template>

<script lang="jsx">
import { h } from 'vue'
import pageMixin from '@/utils/pageMixin'
import IndexDialog from '@/views/notice/components/IndexDialog'
import BindMenuDialog from '@/views/role/components/BindMenuDialog'

export default {
  name: 'Log',
  mixins: [pageMixin],
  components: {
    IndexDialog,
    BindMenuDialog
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
    // this.getTableData()

    let i = 0
    while (i < 10) {
      this.tableData.push({
        appId: 1,
        noticeId: i,
        title: i,
        content: `内容${i}`,
        disabled: 0,
        validTime: i < 3 ? ['2022-12-07 10:10:00', '2022-12-09 10:10:00'] : null,
        target: '生效对象',
        remark: '备注',
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

      if (percentage && percentage > 100) {
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
    }
  }
}
</script>
