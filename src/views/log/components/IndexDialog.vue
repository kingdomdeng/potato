<template>
  <PageDrawer v-model="isShow" title="标题2333" @close="close">
    <template #title>
      <h4>
        {{ form.userName }}
        <el-tag
            size="small"
            effect="dark"
            :type="form.level"
            style="margin-left: 10px"
        >{{ form.level }}</el-tag>
      </h4>
    </template>

    <el-row :gutter="15" class="page-info-container">
      <el-col :span="8">
        <el-descriptions :column="1" size="small" class="page-info-item" border>
          <el-descriptions-item label="用户名" min-width="70">
            {{ form.userName }}
          </el-descriptions-item>

          <el-descriptions-item label="动作" min-width="70">
            {{ form.action }}
          </el-descriptions-item>

          <el-descriptions-item label="等级" min-width="70">
            {{ form.level }}
          </el-descriptions-item>

          <el-descriptions-item label="IP/设备" min-width="70">
            {{ form.device }}
          </el-descriptions-item>

          <el-descriptions-item label="创建时间" min-width="70">
            {{ form.createTime }}
          </el-descriptions-item>
        </el-descriptions>
      </el-col>

      <el-col :span="16">
        <div class="page-info-content">
          <table class="table">
            <thead>
              <tr>
                <th class="label"></th>
                <th class="label">修改前</th>
                <th class="label">修改后</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in datalist" :key="item.label">
                <td class="label">{{ item.label }}</td>
                <td class="value">{{ item.begin }}</td>
                <td class="value">
                  <template v-if="item.begin == item.end">{{ item.end }}</template>
                  <el-tag v-else type="warning" size="small">{{ item.end }}</el-tag>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </el-col>
    </el-row>
  </PageDrawer>
</template>

<script setup>
// import { formRules } from '../utils/validate'
import PageDrawer from '@/components/PageDrawer/PageDrawer'
</script>

<script>
export default {
  name: 'IndexDialog',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    option: Object
  },
  data () {
    return {
      title: '',
      visible: false,
      form: {
        userName: '',
        action: '',
        level: '',
        device: '',
        createTime: '',
      },
      datalist: [
        { label: 'userName', begin: '张三', end: '李四' },
        { label: 'level', begin: '15', end: '15' },
        { label: 'device', begin: '谷歌', end: '火狐' },
        { label: 'createTime', begin: '2022-12-07', end: '2022-12-07' },
        { label: 'updateTime', begin: '2022-12-07', end: '2022-12-08' },
        { label: 'updateTime1', begin: '2022-12-07', end: '2022-12-08' },
        { label: 'updateTime2', begin: '2022-12-07', end: '2022-12-08' },
        { label: 'updateTime3', begin: '2022-12-07', end: '2022-12-08' },
        { label: 'updateTime4', begin: '2022-12-07', end: '2022-12-08' },
        { label: 'updateTime5', begin: '2022-12-07', end: '2022-12-08' },
        { label: 'updateTime6', begin: '2022-12-07', end: '2022-12-08' },
        { label: 'updateTime7', begin: '2022-12-07', end: '2022-12-08' },
        { label: 'updateTime8', begin: '2022-12-07', end: '2022-12-08' },
        { label: 'updateTime9', begin: '2022-12-07', end: '2022-12-08' },
        { label: 'updateTime0', begin: '2022-12-07', end: '2022-12-08' },
      ],
    }
  },
  watch: {
    option() {
      this.setForm(this.option.data)
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
  created () {

  },
  methods: {
    getData (id) {
      this.$api.role.info(id).then(res => {
        this.form = res.data
      })
    },
    setForm (data) {
      Object.assign(this.$data.form, this.$options.data().form)

      Object.keys(data).forEach(attr => {
        if (this.form.hasOwnProperty(attr)) {
          this.form[attr] = data[attr]
        }
      })
    },
    close () {
      // 重置组件数据
      Object.assign(this.$data, this.$options.data())
      this.$emit('update:modelValue', false)
    },
  },
}
</script>

<style lang="scss" scoped>
.page-info-container {
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

    .table {
      width: 100%;
      font-size: $ft12;
      border-collapse: collapse;
      background: #fff;

      td,th {
        padding: 4px 7px;
        line-height: 23px;
        border: $border;
      }

      .label{
        color: #666;
        background: #f5f7fa;
        font-weight: bold;
        text-align: left;
      }

      .value {

      }
    }
  }
}
</style>
