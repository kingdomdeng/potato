<template>
  <div class="container">
    <div class="tool">
      <el-button type="primary" @click="confirm">部 署</el-button>
      请选择制品后点击部署
    </div>

    <div class="content">
      <PageTable ref="table" :data="tableData" v-bind="pageMixin_table" @select-all="selectAll">
        <PageTableColumn type="selection" :selectable="checkHasSelected" width="40" fixed/>
        <PageTableColumn type="index" label="#" fixed/>
        <PageTableColumn prop="name" label="制品名称" fixed/>
        <PageTableColumn prop="branch" label="分支"/>
        <PageTableColumn prop="tag" label="标签"/>
        <PageTableColumn prop="status" label="状态"/>
        <PageTableColumn prop="operator" label="操作人"/>
        <PageTableColumn prop="updateTime" label="修改时间" width="180" sortable="custom"/>
        <!--<PageTableColumn label="操作" width="150" fixed="right">-->
        <!--  <template v-slot="scope">-->
        <!--    <el-button type="primary" text size="small">部署</el-button>-->
        <!--    <el-button type="primary" text size="small">删除</el-button>-->
        <!--  </template>-->
        <!--</PageTableColumn>-->
      </PageTable>

      <el-pagination v-bind="pageMixin_pagination" />
    </div>
  </div>
</template>

<script setup>
import pageMixin from '@/utils/pageMixin'
</script>

<script>
export default {
  name: "DetailsDeploy",
  mixins: [pageMixin],
  data() {
    return {
      tableData: [],
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    confirm() {

    },
    getTableData () {
      this.$api.pipeline.getMaterialList().then(res => {
        this.tableData = res.data.list
        this.$pageMixin_set(res.data.page)
      })
    },
    checkHasSelected(row, index) {
      let selected = this.pageMixin_selected
      if (selected.length && selected[0] != row) {
        return false
      }
      return true
    },
    selectAll(selection) {
      let table = this.$refs.table.context
      table.clearSelection()

      if (selection && selection.length) {
        table.toggleRowSelection(selection[0], true)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  .tool {
    margin: $m;
    color:  #eebe77;
    text-align: center;
    .el-button {
      margin-right: $m;
    }
  }

  .content {
    :deep() {
      .el-pagination {
        margin-top: $m;
      }
    }
  }
}
</style>
