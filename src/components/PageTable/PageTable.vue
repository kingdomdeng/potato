<script lang="jsx">
import { reactive, provide, watch } from 'vue'

export default {
  name: "PageTable",
  props: {
    tableProps: {
      type: Array,
      default: []
    }
  },
  setup(props, { attrs, slots }) {
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

    return () => (
        <el-table v-slots={ slots } { ...attrs } border/>
    )
  }
}
</script>
