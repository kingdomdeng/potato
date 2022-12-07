// 组件分页mixin

/* <el-pagination
  :layout="pageMixin_layout"
  :total="pageMixin_pageTotal"
  :page-sizes="pageMixin_pageSizes"
  :page-size="pageMixin_params.pageSize"
  :current-page="pageMixin_params.pageCurrent"
  @size-change="$pageMixin_sizeChange"
  @current-change="$pageMixin_currentChange"
></el-pagination> */

export default {
  data () {
    return {
      pageMixin_params: {
        pageCurrent: 1,
        pageSize: 10,
      },
      pageMixin_pageSizes: [10, 20, 30, 40, 50, 100],
      pageMixin_layout: 'total, sizes, prev, pager, next, jumper',
      pageMixin_pageTotal: 0,
      pageMixin_pageFunc: '',
      pageMixin_loading: false,
    }
  },
  created () {
    this.pageMixin_pageFunc = this.getTableData
  },
  methods: {
    $pageMixin_sizeChange (val) {
      this.pageMixin_params.pageSize = val
      this.pageMixin_pageFunc()
    },
    $pageMixin_currentChange (val) {
      this.pageMixin_params.pageCurrent = val
      this.pageMixin_pageFunc()
    },
    $pageMixin_search () {
      // this.queryParams = {};
      this.pageMixin_params.pageCurrent = 1
      this.pageMixin_pageFunc()
    },
    $pageMixin_set (obj) {
      this.pageMixin_pageTotal = obj.total
      this.pageMixin_params.pageSize = obj.pageSize
      this.pageMixin_params.pageCurrent = obj.pageCurrent
      // this.pageMixin_pageTotal = obj.total ?? this.pageMixin_pageTotal;
      // this.pageMixin_params.pageSize = obj.pageSize ?? this.pageMixin_params.pageSize
      // this.pageMixin_params.pageCurrent = obj.pageCurrent ?? this.pageMixin_params.pageCurrent
    }
  }
}
