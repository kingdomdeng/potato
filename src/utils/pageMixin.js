// 组件分页mixin
/* 推荐使用
* <el-pagination v-bind="pageMixin_pagination" />
* */

/* <el-pagination
  :layout="pageMixin_layout"
  :total="pageMixin_pageTotal"
  :page-sizes="pageMixin_pageSizes"
  :page-size="pageMixin_params.pageSize"
  :current-page="pageMixin_params.pageCurrent"
  @size-change="$pageMixin_sizeChange"
  @current-change="$pageMixin_currentChange"
></el-pagination> */

/*<el-table
  :data="tableData"
  :default-sort="pageMixin_defaultSort"
  @selection-change="$pageMixin_selection"
  @sort-change="$pageMixin_sort"
>*/

export default {
  data() {
    return {
      pageMixin_params: {
        pageCurrent: 1,
        pageSize: 10,
      },
      pageMixin_defaultSort: {
        prop: 'createTime',
        order: 'descending',
      },
      pageMixin_sort: {
        by: '',
        order: '',
      },
      pageMixin_selected: [],
      pageMixin_pageSizes: [10, 20, 30, 40, 50, 100],
      pageMixin_layout: 'total, sizes, prev, pager, next, jumper',
      pageMixin_pageTotal: 0,
      pageMixin_pageFunc: '',
      pageMixin_loading: false,
    }
  },
  computed: {
    pageMixin_pagination() {
      return {
        layout: this.pageMixin_layout,
        total: this.pageMixin_pageTotal,
        pageSizes: this.pageMixin_pageSizes,
        pageSize: this.pageMixin_params.pageSize,
        currentPage: this.pageMixin_params.pageCurrent,
        onSizeChange: this.$pageMixin_sizeChange,
        onCurrentChange: this.$pageMixin_currentChange,
      }
    },
    
    pageMixin_table() {
      return {
        defaultSort: this.pageMixin_defaultSort,
        onSelectionChange: this.$pageMixin_selection,
        onSortChange: this.$pageMixin_sort,
      }
    }
  },
  created() {
    this.pageMixin_pageFunc = this.getTableData
  },
  methods: {
    $pageMixin_sizeChange(val) {
      this.pageMixin_params.pageSize = val
      this.pageMixin_pageFunc()
    },
    
    $pageMixin_currentChange(val) {
      this.pageMixin_params.pageCurrent = val
      this.pageMixin_pageFunc()
    },
    
    $pageMixin_search() {
      // this.queryParams = {};
      this.pageMixin_params.pageCurrent = 1
      this.pageMixin_pageFunc()
    },
    
    $pageMixin_set(obj) {
      this.pageMixin_pageTotal = obj.total
      this.pageMixin_params.pageSize = obj.pageSize
      this.pageMixin_params.pageCurrent = obj.pageCurrent
      // this.pageMixin_pageTotal = obj.total ?? this.pageMixin_pageTotal;
      // this.pageMixin_params.pageSize = obj.pageSize ?? this.pageMixin_params.pageSize
      // this.pageMixin_params.pageCurrent = obj.pageCurrent ?? this.pageMixin_params.pageCurrent
    },
    
    $pageMixin_selection(selected) {
      this.pageMixin_selected = selected
    },
    
    $pageMixin_sort({ column, prop, order }) {
      this.pageMixin_sort.by = prop
      this.pageMixin_sort.order = order && order === 'ascending'
        ? 'ASC'
        : 'DESC'
    },
    
    $pageMixin_dialog(ref, data) {
      this?.$refs[ref]?.open({
        type: data._type ?? 'edit',
        data: data ? JSON.parse(JSON.stringify(data)) : {}
      })
    },
    
    $pageMixin_dialogAdd(ref, data) {
      this.$pageMixin_dialog(ref, { _type: 'add', data })
    },
    
  }
}
