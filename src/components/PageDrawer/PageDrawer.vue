<template>
  <el-drawer
    ref="drawer"
    v-model="isShow"
    :modal="false"
    :show-close="false"
    :direction="direction"
    :modal-class="modalClass"
  >
    <template #header="{ close, titleId, titleClass }">
      <slot name="title">
        <h4>{{ title }}</h4>
      </slot>

      <div class="tool">
        <el-button
            class="icon-drag"
            :icon="DCaret"
            title="拖动"
            v-mouseDirective="{
              target: '.page-container-drawer',
              callback: handleMouse,
            }"
        />
        <el-button class="icon-max" :icon="Upload" title="最大" @click="toPosition('max')"/>
        <el-button class="icon-min" :icon="Download" title="最小" @click="toPosition('min')"/>
        <el-button :icon="Close" title="关闭" @click="handleClose"/>
      </div>
    </template>
    <slot></slot>
  </el-drawer>
</template>

<script setup>
import {
  Close,
  Download,
  Upload,
  DCaret,
} from '@element-plus/icons-vue'
</script>

<script>
export default {
  name: "PageDrawer",
  emits: [
    'update:modelValue',
    'close',
    'resize',
  ],
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String
    },
    direction: {
      type: String,
      default: 'btt', // btt/rtl
    },
    width: {
      type: Number,
      default: 500, // 初始化值
    },
    height: {
      type: Number,
      default: 500, // 初始化值
    },
    widthRange: {
      type: Object,
      default: {
        min: 0,
        max: 0,
      }, // [min, max],[0, 0]交给默认处理
    },
    heightRange: {
      type: Object,
      default: {
        min: 0,
        max: 0,
      }, // [min, max],[0, 0]交给默认处理
    },
  },
  data() {
    return {
      ctxEL: null,
      limitWidth: {
        min: 300,
        max: 0,
      },
      limitHeight: {
        min: 40,
        max: 0,
      },
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
    modalClass() {
      let direction = this.direction
      return `page-container-drawer page-container-drawer-${ direction }`
    },
  },
  // watch: {
  //   isShow(val) {
  //     if (val) {
  //       this.setStyle()
  //     }
  //   },
  //   direction: {
  //     handler() {
  //
  //     },
  //     immediate: true
  //   }
  // },
  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init() {
      let { width, height } = this

      this.ctxEL = document.querySelector('.page-container-drawer')
      this.initLimit()
      this.setStyle({ width, height })
      this.ctxEL.style.setProperty('display', 'none')

      if (this.direction === 'rtl') {
        this.ctxEL.parentElement.style.setProperty('flex-direction', 'row')
      }
    },
    initLimit() {
      let parentEl = this.ctxEL.parentElement
      let { clientHeight, clientWidth } = parentEl
      let { widthRange, heightRange, limitWidth, limitHeight } = this

      // 初始化默认父级节点为最大
      limitWidth.max = clientWidth - limitWidth.min
      limitHeight.max = clientHeight - limitHeight.min

      // 检测props是否有
      if (widthRange.min !== 0 || widthRange.max !== 0) {
        this.limitWidth = {
          min: this.getNonZero(widthRange.min, limitWidth.min),
          max: this.getNonZero(widthRange.max, limitWidth.max),
        }
      }

      if (heightRange.min !== 0 || heightRange.max !== 0) {
        this.limitHeight = {
          min: this.getNonZero(heightRange.min, limitWidth.min),
          max: this.getNonZero(heightRange.max, limitWidth.max),
        }
      }
    },
    setStyle({ width, height }) {
      let { ctxEL, direction } =  this
      let style = direction === 'btt'
          ? `height: ${ height }px`
          : `width: ${ width }px`

      ctxEL.setAttribute('style', style)

      let event = new CustomEvent("PageDrawerResize", {
        bubbles: true,
        detail: {
          width,
          height,
        }
      });
      this.$refs.drawer.$el.dispatchEvent(event);
      this.$emit('resize')
    },
    handleClose() {
      this.isShow = false
      this.$emit('close')
    },
    handleMouse({ width, height }) {
      let { limitWidth, limitHeight } = this
      this.setStyle({
        height: this.getLimitVal(height, limitHeight),
        width: this.getLimitVal(width, limitWidth),
      })
    },
    toPosition(type) {
      let { limitWidth, limitHeight } = this
      this.setStyle({
        height: type === 'max' ? limitHeight.max : limitHeight.min,
        width: type === 'max' ? limitWidth.max : limitWidth.min,
      })
    },
    getNonZero(n, m) {
      return n != 0 ? n : m
    },
    getLimitVal(val, range) {
      if (val < range.min) return range.min
      if (val > range.max) return range.max

      return val
    }
  }
}
</script>

<style lang="scss">
  .page-container-drawer, .page-container-drawer.el-overlay {
    position: absolute!important;

    &.page-container-drawer-btt {
      inset: auto 0 0 0!important;

      .el-drawer {
        border-top: 2px solid #b3b3b3;
      }
    }

    &.page-container-drawer-rtl {
      inset: 0 0 0 auto!important;

      .el-drawer {
        border-left: 2px solid #b3b3b3;
      }

      .tool {
        .icon-drag {
          transform: rotate(90deg);
        }
        .icon-max {
          transform: rotate(-90deg);
        }
        .icon-min {
          transform: rotate(-90deg);
        }
      }
    }

    .el-drawer {
      width: 100% !important;
      height: 100% !important;
      box-shadow: unset;

      .el-drawer__header {
        margin-bottom: 0;
        padding: 6px $p;
        background: #d3d3d3;

        h4 {
          margin: 0;
          font-size: $ft16;
          font-weight: normal;
        }

        .tool {
          .el-button {
            padding: 0 5px;
            height: 24px;
            background: inherit;
            border: none;
            color: $fc6;

            &+.el-button {
              margin-left: 5px;
            }

            &:hover {
              background: #b7b7b7;
            }
          }
        }
      }

      .el-drawer__body {
        padding: $p;
        overflow: overlay;
      }
    }
  }
</style>
