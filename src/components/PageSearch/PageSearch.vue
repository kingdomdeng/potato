<script lang="jsx">
import {inject, ref, watch} from "vue";

export default {
  name: "PageSearch",
  emits: [
    'search',
    'reset',
  ],
  setup(props, { attrs, slots, emit }) {
    let form = ref(null)
    let attrObj = {
      inline: true,
      ...attrs
    }

    const onSearch = () => {
      emit('search')
    }

    const onReset = () => {
      form.value.resetFields()
      emit('reset')
    }

    return () => (
        <div className="page-search">
          <el-form ref={form} { ...attrObj } size="small">
            { slots.default && slots.default() }

            <el-form-item>
              <el-button size="small" type="primary" onClick={ onSearch } plain>查 询</el-button>
              <el-button size="small" onClick={ onReset }>重 置</el-button>
            </el-form-item>
          </el-form>
        </div>
    )
  },
}
</script>
