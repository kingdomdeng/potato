<template>
  <PageDrawer v-model="isShow" title="标题2333" @close="close">
    <template #title>
      <h4 class="title-tab">
        <!--
        {{ form.userName }}
        -->
        测试流水线

        <div class="tab-line">
          <div
              class="tab-line-item"
              :class="{ active: activeName === item.name }"
              v-for="item in tabList"
              :key="item.name"
              @click="activeName = item.name"
          >
            <template v-if="item.name !== 'base'">
              {{ item.label }}
            </template>
            <el-badge v-else value="! " type="danger" is-dot>
              {{ item.label }}
            </el-badge>

          </div>
        </div>
      </h4>
    </template>

    <div class="page-info-container">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="base" name="base" lazy>
          <DetailsBase></DetailsBase>
        </el-tab-pane>

        <el-tab-pane label="dev" name="dev" lazy>
          <DetailsDeploy type="dev"></DetailsDeploy>
        </el-tab-pane>

        <el-tab-pane label="test" name="test" lazy>
          <DetailsDeploy type="test"></DetailsDeploy>
        </el-tab-pane>

        <el-tab-pane label="pre" name="pre" lazy>
          <DetailsDeploy type="pre"></DetailsDeploy>
        </el-tab-pane>

        <el-tab-pane label="prd" name="prd" lazy>
          <DetailsDeploy type="prd"></DetailsDeploy>
        </el-tab-pane>
      </el-tabs>
    </div>
  </PageDrawer>
</template>

<script setup>
// import { formRules } from '../utils/validate'
import DetailsBase from './components/DetailsBase'
import DetailsDeploy from './components/DetailsDeploy'
</script>

<script>
export default {
  name: 'Details',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    option: Object
  },
  data() {
    return {
      title: '',
      visible: false,
      activeName: 'base',
      tabList: [
        { name: 'base', label: '基本信息' },
        { name: 'dev', label: '开发环境' },
        { name: 'test', label: '测试环境' },
        { name: 'pre', label: '预发环境' },
        { name: 'prd', label: '正式环境' },
      ],
    }
  },
  computed: {
    isShow: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit('update:modelValue', val)
      }
    },
  },
  methods: {
    confirm() {

    },
    cancel() {

    },
    close() {
      // 重置组件数据
      // Object.assign(this.$data, this.$options.data())
      this.$emit('update:modelValue', false)
    },
  },
}
</script>

<style lang="scss" scoped>
.page-info-container {
  :deep() {
    .el-tabs {
      .el-tabs__header {
        display: none;
      }
    }
  }
}
</style>

<style lang="scss">
.title-tab {
  display: flex;
  align-items: center;

  .tab-line {
    display: flex;
    margin-left: $m;

    .tab-line-item {
      margin-right: calc($m/2);
      padding: 3px 15px;
      border-radius: $br;
      font-size: $ft14;
      font-weight: normal;
      text-align: center;
      line-height: normal;
      cursor: pointer;
      user-select: none;
      transition: all .2s;

      &.active, &:hover {
        color: #409eff;
        background: rgba(255,255,255,.5);
      }
    }
  }
}
</style>
