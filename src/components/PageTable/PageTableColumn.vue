<script lang="jsx">
import {ref, inject, watch} from 'vue'
import { isNumber } from 'lodash'

const reg = /\B(?=(\d{3})+(?!\d))/g

function numToThousands(row, column, cellValue, index) {
  if (!isNumber(cellValue)) {
    return cellValue
  }
  return String(cellValue).replace(reg, ',')
}

export default {
  name: "PageTableColumn",
  props: {
    prop: {
      type: String
    },
    thousands: {
      type: Boolean,
      default: false,
    }
  },
  setup(props, { attrs, slots }) {
    let isShow = ref(true)
    const tablePropsMap = inject('tablePropsMap')
    let attrObj = {
      prop: props.prop,
      align: props.thousands ? 'right' : 'left',
      formatter: !props.thousands ? undefined : numToThousands,
      ...attrs,
    }

    function getShow(map) {
      if (props.prop && map.hasOwnProperty(props.prop)) {
        isShow.value = map[props.prop]
      }
    }

    getShow(tablePropsMap)
    watch(tablePropsMap, (map) => {
      getShow(map)
    })

    return () => (
        isShow.value
            ? <el-table-column v-slots={ slots } { ...attrObj } />
            : null
    )
  }
}
</script>
