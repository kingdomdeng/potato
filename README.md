# patato

This template should help get you started developing with Vue 3 in Vite.

### node 版本： Vite 需要 Node.js 版本 14.18+，16+
https://nodejs.org/dist/

### 如果单文件SFC中需要写JSX的语法时，需要加： lang="jsx"
例子：views/notice/index.vue: getNoticeProgress

```
<script lang="jsx">
    export default {
        setup() {
            return () => (
                <div>
                    <otherComponent />
                </div>
            )
        }
    }
</script>
```

### 配置文件
#### package.json
-略

#### vite.config.js
1. 开发、打包、代理转发等配置
2. 和vue2的底层服务换了很多：例如proxy：vite使用node-http-proxy， webpack：http-proxy-middleware，
没有router功能；rewrite的写法也不一样
3. scss导入了全局的变量文件variables.scss
4. resolve增加.vue的导入，默认是没有的（即需要导入的时候主动写上xxx.vue）

#### src/api
1. 统一管理api
2. 已在在入口main.js中，绑定到vue的实例中，使用： this.$api.menu.xxx

#### src/component
1. 公共组件，多个文件组成的组件用文件夹

#### src/main.js
1. 入口文件

#### src/views
1. 有独立模块的router、stores、components方便模块迁移

#### src/router
1. 路由集合

#### src/configs/axios
1. axios配置相关

#### src/stores
1. 全局状态集合
2. 可以用pinia或vuex

#### src/utils
1. 工具类，mixins等
2. mixin的变量、方法最好带有前缀
