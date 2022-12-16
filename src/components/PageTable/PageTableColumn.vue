<script lang="jsx">
import {ref, inject, watch} from 'vue'

export default {
  name: "PageTableColumn",
  props: {
    prop: {
      type: String
    }
  },
  setup(props, { attrs, slots }) {
    const tablePropsMap = inject('tablePropsMap')
    let attrObj = { prop: props.prop, ...attrs}
    let isShow = ref(true)
    let getShow = (map) => {
      if (props.prop && map.hasOwnProperty(props.prop)) {
        isShow.value = map[props.prop]
      }
    }

    watch(tablePropsMap, (map) => {
      getShow(map)
    })

    getShow(tablePropsMap)
    return () => (
        isShow.value
            ? <el-table-column v-slots={ slots } { ...attrObj } />
            : null
    )
  }
}
</script>
