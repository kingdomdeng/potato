<template>
  <el-dialog v-bind="dialogMixin_dialog">
    <IndexForm :option="option" :show-title="false" @close="$dialogMixin_close"></IndexForm>
  </el-dialog>
</template>

<script>
import dialogMixin from '@/utils/dialogMixin'
import IndexForm from '@/views/menu/components/IndexForm'

export default {
  name: 'IndexListDialog',
  components: {
    IndexForm
  },
  mixins: [dialogMixin],
  expose: [
    'open',
  ],
  data() {
    return {
      option: {},
    }
  },
  methods: {
    open({ type, data }) {
      this.$dialogMixin_open({ type, data })
      this.option = { type, data }
    },
  },
}
</script>

<style scoped>

</style>
