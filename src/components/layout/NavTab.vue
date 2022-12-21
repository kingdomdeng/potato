<template>
  <ul class="history-list">
    <li
        class="list-item"
        v-for="(item, index) in historyList"
        :key="item.fullPath"
        :class="{ active: checkAtive(item) }"
        @click="routerTo(item)"
    >
      {{ item.name }}

      <el-icon class="close" @click.stop="close(item, index)"><Close /></el-icon>
    </li>
  </ul>
</template>

<script setup>
import {Close} from '@element-plus/icons-vue'
</script>

<script>
export default {
  name: "NavTab",
  props: {
    options: {
      type: Array,
      default: [],
    }
  },
  data() {
    return {
      historyList: [],
    }
  },
  watch: {
    $route (route) {
      this.setHistory(route)
    }
  },
  created() {
    let list = sessionStorage.getItem('historyList') ?? '[]'
    this.historyList = JSON.parse(list)

    this.setHistory(this.$route)
  },
  methods: {
    setHistory(route) {
      let { fullPath, name } = route
      let match = this.options.find(a => a.name === name)
      let isInArr = this.historyList.some(item => {
        return item.fullPath === fullPath
      })

      if (!isInArr) {
        this.historyList.push({
          fullPath: route.fullPath,
          meta: route.meta,
          name: match.title,
          params: route.params,
          path: route.path,
          query: route.query,
        })

        this.saveStorage()
      }
    },
    routerTo(route) {
      if (route.fullPath !== this.$route.fullPath) {
        this.$router.push(route.fullPath)
      }
    },
    close(tab, index) {
      if (this.historyList.length > 1) {
        this.historyList.splice(index, 1)
        this.saveStorage()

        if (tab.fullPath === this.$route.fullPath) {
          let len = this.historyList.length
          let toIndex = len - 1 > index ? index : len - 1 // 右移
          this.routerTo(this.historyList[toIndex])
        }
      }
    },
    checkAtive(tab) {
      return tab.fullPath === this.$route.fullPath
    },
    saveStorage() {
      sessionStorage.setItem('historyList', JSON.stringify(this.historyList))
    }
  },
}
</script>

<style lang="scss" scoped>
.history-list {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  height: 100%;
  background: #E6E8EB;
  overflow: hidden;
  overflow-x: overlay;

  .list-item {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    //margin-right: 15px;
    padding: 0 10px;
    height: 100%;
    max-width: 120px;
    list-style: none;
    cursor: pointer;
    transition: width .3s;

    .close {
      margin-left: 10px;
      width: 0;
      transition: width .2s;

      &:hover {
        color: #fff;
        background: #409eff;
        border-radius: 20px;
      }
    }

    &:hover:not(.active) {
      color: #409eff;
      background: #D4D7DE;

      .close {
        width: 14px;
      }
    }

    &.active {
      color: #409eff;
      background: #fff;

      .close {
        width: 14px;
      }
    }
  }
}
</style>
