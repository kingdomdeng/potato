<template>
  <div class="home">
    <el-container>
      <el-header>Header</el-header>
      <el-container style="height: 100%;overflow: auto">
        <el-aside width="200px">
          <el-row>
            <el-col :span="24">
              <el-menu
                  :default-active="defaultActive"
                  class="el-menu-vertical-demo"
                  @open="handleOpen"
                  @close="handleClose"
                  background-color="#545c64"
                  text-color="#fff"
                  active-text-color="#ffd04b"
                  router
              >
                <!--<el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>导航一</span>
                  </template>
                  <el-menu-item-group>
                    <template slot="title">分组一</template>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                  </el-menu-item-group>
                  <el-menu-item-group title="分组2">
                    <el-menu-item index="1-3">选项3</el-menu-item>
                  </el-menu-item-group>
                  <el-submenu index="1-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                  </el-submenu>
                </el-submenu>-->

                <el-menu-item
                    v-for="item in menuList"
                    :key="item.name"
                    :index="item.name"
                    :route="item.route"
                >
                  <el-icon>
                    <component :is="ElementIcon[item.icon]"></component>
                  </el-icon>
                  <span slot="title">{{ item.title }}</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>

        <el-main :class="{ isShowNotice }">
          <!-- 公告 -->
          <div>
            <el-alert class="notice" type="info" @close="isShowNotice = false" show-icon>
              <template v-slot:title>
                消息提示的文案
              </template>
            </el-alert>
          </div>

          <div class="container-view">
            <!-- 主内容 -->
            <router-view/>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
// import {HelpFilled, User, Notification, Menu, Notebook } from '@element-plus/icons-vue'
import * as ElementIcon from '@element-plus/icons-vue'
</script>

<script>
export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  data () {
    return {
      defaultActive: 'menu',
      isShowNotice: true,
      menuList: [
        { title: '菜单管理', name: 'menu', route: { name: 'menu' }, icon: 'Menu' },
        { title: '用户管理', name: 'user', route: { name: 'user' }, icon: 'User' },
        { title: '角色管理', name: 'role', route: { name: 'role' }, icon: 'HelpFilled' },
        { title: '公告管理', name: 'notice', route: { name: 'notice' }, icon: 'Notification' },
        { title: '日志管理', name: 'log', route: { name: 'log' }, icon: 'Notebook' },
      ]
    }
  },
  watch: {
    $route (route) {
      this.getDefaultActive(route)
    }
  },
  created () {
    this.getDefaultActive(this.$route)
  },
  methods: {
    getDefaultActive (route) {
      let { name } = route
      this.defaultActive = name
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
 :deep() {
    .el-header {
      background: #293c4e;
    }

    .el-aside {
      background: #545c64;
      .el-menu {
        border-right: none;
      }
    }

    .el-main {
      position: relative;
      padding: 0;
      padding-bottom: 30px;

      .container-view {
        padding: 15px;
        overflow: auto;
        flex: 1;
      }

      &.isShowNotice {
        .notice {
          position: sticky;
          top: 0;
          left: 0;
          z-index: 9;

         :deep() {
            .el-alert__content {
              width: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
