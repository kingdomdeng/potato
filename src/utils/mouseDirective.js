let originX = 0
let originY = 0
let sliding = false
let ctxEL = null
let callbackFn = null

function onMouseDown(e) {
  let { clientX, clientY } = e
  originX = clientX
  originY = clientY
  sliding = true
  
  document.addEventListener('mousemove', onMouseMove)
}

function onMouseMove(e) {
  if(!sliding) return
  
  let { clientX, clientY } = e
  let height = ctxEL.clientHeight + (originY - clientY)
  let width = ctxEL.clientWidth + (originX - clientX)
  
  callbackFn && callbackFn({ width, height })
  originX = clientX
  originY = clientY
}

function onMouseUp() {
  sliding = false
  document.removeEventListener('mousemove', onMouseMove)
}

const mouseDirective = {
  mounted(el, binding, vnode, prevVnode) {
    let { target, callback } = binding.value
    ctxEL = document.querySelector(target)
    callbackFn = callback
    
    if (!ctxEL) return

    document.addEventListener('mouseup', onMouseUp)
    el.addEventListener('mousedown', onMouseDown)
  },
  unmounted(el, binding, vnode, prevVnode) {
    el.removeEventListener('mousedown', onMouseDown)
    document.removeEventListener('mouseup', onMouseUp)
  },
}

export default mouseDirective
