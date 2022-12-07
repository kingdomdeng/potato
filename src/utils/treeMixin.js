// menu 树组件

import { findUserMenu } from '@/api/menu'

export default {
  data () {
    return {
      treeMixin_treeList: [],
      treeMixin_menuSelected: [],
      treeMixin_roleSelected: [],
      treeMixin_roleList: [],
      treeMixin_userMenuList: [],
    }
  },
  methods: {
    $treeMixin_genTree (list) {
      // 生成树
      let recursion = (nodeId, attr, parentAttr) => {
        let peer = list.filter(a => a[parentAttr] === nodeId)

        peer.forEach(item => {
          item.children = recursion(item[attr], attr, parentAttr)
        })

        return peer
      }

      this.treeMixin_treeList = recursion('', 'menuId', 'parentId')
    },
    $treeMixin_getAppMenuByAppId (appId, isDisabled = false) {
      // 获取应用全部菜单
      let params = {
        appId
      }

      this.$api.menu.getAppMenuByAppId(params).then(res => {
        let list = res.data

        if (isDisabled) {
          list = res.data.map(a => {
            a.isDisabled = true
            return a
          })
        }

        this.$treeMixin_genTree(list)
      })
    },
    $treeMixin_findRoleMenu (appId, roleIds) {
      // 获取角色菜单
      let params = {
        appId,
        roleIds,
      }

      return this.$api.menu.findRoleMenu(params).then(res => {
        this.treeMixin_menuSelected = res.data.map(a => a.menuId)
      })
    },
    $treeMixin_findUserRole (appId, userId) {
      // 获取用户拥有的角色
      let params = {
        appId,
        userId
      }

      this.$api.role.findUserRole(params).then(res => {
        this.treeMixin_roleSelected = res.data.map(a => a.roleId)
      })
    },
    $treeMixin_getAppRoleByAppId (appId) {
      // 获取应用所有角色
      let params = {
        appId: this.option.data.appId,
      }

      this.$api.role.getAppRoleByAppId(params).then(res => {
        this.treeMixin_roleList = res.data
      })
    },
    $treeMixin_findUserMenu (appId, userId) {
      // 获取用户所有菜单
      let params = {
        appId,
        userId
      }

      this.$api.menu.findUserMenu(params).then(res => {
        this.treeMixin_userMenuList = res.data.map(a => a.menuId)
      })
    },
  }
}
