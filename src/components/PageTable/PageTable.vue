<script lang="jsx">
import { ref, reactive, provide, watch } from 'vue'

export default {
  name: "PageTable",
  props: {
    tableProps: {
      type: Array,
      default: []
    }
  },
  setup(props, { attrs, slots, expose }) {
    const table = ref(null)
    let tablePropsMap = reactive({})
    let getMap = (arr) => {
      arr && arr.forEach(item => {
        tablePropsMap[item.prop] = item.isShow
      })
    }

    watch(props.tableProps, (arr) => {
      getMap(arr)
    })

    getMap(props.tableProps)
    provide('tablePropsMap', tablePropsMap)
    expose({
      context: table
    })

    return () => (
        <el-table ref={table} v-slots={ slots } { ...attrs } border/>
    )
  }
}
</script>
