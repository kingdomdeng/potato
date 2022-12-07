<script>
export default {
  name: 'RenderVNode',
  props: {
    vnode: {
      type: [Object, null, undefined]
    }
  },
  render (createElement, context) {
    let vnode = this.vnode
    if (typeof vnode === 'object' && vnode && vnode.ctx) {
      return vnode

    } else {
      return ''
    }
  }
}
</script>
