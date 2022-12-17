<template>
  <div class="page-content-tool">
    <div class="tool-left">
      <slot name="normal">
        <el-button
            v-for="item in normalList"
            :key="item.command"
            :type="item.type"
            :disabled="item.disabled || disabledBatch(item.command)"
            :title="disabledBatch(item.command) ? '请选择勾选数据' : item.name"
            @click="handleCommand(item.command)"
            size="small"
            plain
        >
          {{ item.name }}
        </el-button>
      </slot>

      <slot name="dropdown">
        <el-dropdown v-if="dropdownList.length" @command="handleCommand">
          <el-button size="small">更多操作</el-button>

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                  v-for="item in dropdownList"
                  :key="item.command"
                  :command="item.command"
                  :disabled="item.disabled || disabledBatch(item.command)"
                  :title="disabledBatch(item.command) ? '请选择勾选数据' : item.name"
              >
                {{ item.name }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </slot>

      <!-- default slot -->
      <slot></slot>
    </div>

    <div class="tool-right">
      <el-button-group>
        <el-button
            size="small"
            :icon="Upload"
            :disabled="disabledByType('upload')"
            title="上传"
            @click="handleLoad('upload')"
        />
        <el-button
            size="small"
            :icon="Download"
            :disabled="disabledByType('download')"
            title="下载"
            @click="handleLoad('download')"
        />
        <PageTableProps :modelValue="tableProps">
          <el-button
              size="small"
              :icon="Grid"
              :disabled="disabledByType('tableProps')"
              title="表格控制"
          />
        </PageTableProps>
      </el-button-group>
    </div>
  </div>
</template>

<script setup>
import { Download, Upload, Grid } from '@element-plus/icons-vue'
</script>

<script>
export default {
  name: "PageContentTool",
  props: {
    tableProps: Array,
    isDisabledBatch: {
      type: Boolean,
      default: false
    },
    uploadLink: {
      type: String,
    },
    downloadLink: {
      type: String,
    },
    normalList: {
      type: Array,
      default: [
        { name: '新增', command: 'add', type: 'primary'},
        { name: '删除', command: 'batchDelete', type: 'danger'},
        // { name: '删除', command: 'batchDelete', type: 'danger', disabled: true},
      ]
    },
    dropdownList: {
      type: Array,
      default: [
        { name: '批量修改', command: 'batchEdit'},
        { name: '批量重启', command: 'batchReboot'},
        { name: '批量启动', command: 'batchStart'},
        { name: '批量暂停', command: 'batchStop'},
        { name: '批量禁用', command: 'batchDisable'},
      ]
    }
  },
  emits: [
      'command',
  ],
  data() {
    return {
      // tableProps: [],
    }
  },
  computed: {

  },
  methods: {
    handleCommand(command) {
      this.$emit('command', command)
    },
    disabledBatch(type) {
      let reg = /^batch/

      if (this.isDisabledBatch && reg.test(type)) return true

      return false
    },
    disabledByType(type) {
      let map = {
        upload: () => !this.uploadLink,
        download: () => !this.downloadLink,
        tableProps: () => !this.tableProps.length,
      }
      return map[type] ? map[type]() : false
    },
    handleLoad(type) {
      if (type === 'download') {
        this.download(this.downloadLink)
      }

      this.handleCommand(type)
    },
    download(href) {
      const a = document.createElement('a');
      a.setAttribute('href', href);
      a.setAttribute('target', '_blink');
      // a.setAttribute('download', title);
      a.click();
    }
  }
}
</script>

<style scoped>

</style>
