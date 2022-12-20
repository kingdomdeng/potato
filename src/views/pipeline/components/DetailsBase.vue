<template>
  <el-row :gutter="15">
    <el-col :span="8" class="page-info-item">
      <el-form :model="form" label-width="80px">
        <el-form-item label="分支">
          <el-select
              v-model="form.branch"
              placeholder="请选择"
              style="width: 100%"
          >
            <el-option label="main" value="main" />
            <el-option label="dev" value="dev" />
            <el-option label="feature" value="feature" />
          </el-select>
        </el-form-item>

        <el-form-item label="部署环境">
          <el-select
              v-model="form.development"
              placeholder="请选择"
              multiple
              collapse-tags
              collapse-tags-tooltip
              style="width: 100%"
          >
            <el-option label="开发环境" value="dev" />
            <el-option label="测试环境" value="test" />
            <el-option label="预发环境" value="pre" />
            <el-option label="正式环境" value="prd" />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="confirm">一键部署</el-button>
          <el-button type="primary" @click="confirm">运 行</el-button>
          <el-button @click="cancel">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-col :span="16">
      <TerminalView></TerminalView>
    </el-col>
  </el-row>
</template>

<script setup>
import TerminalView from '@/components/TerminalView'
</script>

<script>
export default {
  name: "DetailsBase",
  data() {
    return {
      form: {
        branch: 'main',
        development: [],
      },
    }
  },
  methods: {
    confirm() {

    },
    cancel() {

    },
  },
}
</script>

<style lang="scss" scoped>
.page-info-item {
  position: sticky;
  top: 0;
}

.page-info-content {
  padding: $p;
  background: #d1dbe5;
  border-radius: $br;
  height: 100%;
  box-sizing: border-box;
  line-height: normal;
}
</style>
