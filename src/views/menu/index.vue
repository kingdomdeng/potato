<template>
  <el-tabs v-model="activeName" class="tab-page-container">
    <el-tab-pane label="列表" name="list" lazy>
      <IndexList></IndexList>
    </el-tab-pane>
    <el-tab-pane label="树" name="tree" lazy>
      <IndexTree></IndexTree>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import IndexList from '@/views/menu/components/IndexList'
import IndexTree from '@/views/menu/components/IndexTree'

export default {
  name: 'Menu',
  components: {
    IndexList,
    IndexTree,
  },
  data () {
    return {
      activeName: 'tree',
    }
  },
}
</script>

<style lang="scss" scoped>
.tab-page-container {
  padding: 15px;
  flex: 1;
  width: 100%;
  box-sizing: border-box;

  .page-container {
    padding: 0!important;
  }
}
</style>
