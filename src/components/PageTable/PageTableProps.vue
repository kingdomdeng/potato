<template>
  <el-popover :width="400" trigger="hover" popper-class="page-table-props">
    <template #reference>
      <slot>
        <el-button size="small">表格属性</el-button>
      </slot>
    </template>

    <div class="title">
      <h4>自定义列表字段</h4>

      <div class="tool">
        <el-button size="small" @click="clean" text>清 空</el-button>
        <el-button size="small" @click="reset" text>重 置</el-button>
      </div>
    </div>

    <el-checkbox
        v-for="item in form"
        v-model="item.isShow"
        :key="item.prop"
        :label="item.name"
        :name="item.name"
        :disabled="item.fixed"
    />
  </el-popover>
</template>

<script>
export default {
  name: "PageTableProps",
  emits: [
      'update:modelValue'
  ],
  props: {
    modelValue: {
      type: Array
    }
  },
  data() {
    return {

    }
  },
  computed: {
    form: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit('update:modelValue', val)
      }
    }
  },
  methods: {
    clean() {
      this.form.forEach(item => {
        if (!item.fixed) {
          item.isShow = false
        }
      })
    },
    reset() {
      this.form.forEach(item => {
        item.isShow = item.default
      })
    }
  }
}
</script>

<style lang="scss">
.page-table-props {
  .title {
    display: flex;
    align-items: center;
    margin-bottom: calc($m/2);

    h4 {
      margin: 0;
      flex: 1;
      color: $fc6;
      font-weight: bold;
    }

    .el-button+.el-button {
      margin-left: 0;
    }

    .el-button:hover {
      color: #409eff;
    }
  }

  .el-checkbox {
    margin-right: $m;
    min-width: 100px;
  }
}
</style>
