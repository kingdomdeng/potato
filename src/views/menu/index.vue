<template>
  <el-tabs v-model="activeName">
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

</style>
