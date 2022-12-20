<template>
  <div class="xterm-view">
    <div ref="terminal" class="xterm-view-content"></div>
  </div>
</template>

<script>
// 文档 https://xtermjs.org/docs/
// TODO: xterm的 v5+ 有点问题，暂时降版本到v4
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

const darkTheme = {
  // ...defaultTheme,
  foreground: '#fff',
  background: '#1d2935',
  cursor: 'rgba(255, 255, 255, .4)',
  selection: 'rgba(255, 255, 255, 0.3)',
  magenta: '#e83030',
  brightMagenta: '#e83030'
}

export default {
  name: "TerminalView",
  mounted() {
    setTimeout(() => {
      this.init()
    }, 500)

  },
  beforeUnmount() {
    this.$_terminal.dispose()
    window.removeEventListener('resize', this.onWindowResize)
    document.removeEventListener('PageDrawerResize', this.onPageDrawerResize)
  },
  methods: {
    async init() {
      const term = this.$_terminal = new Terminal({
        cols: 100,
        rows: 24,
        theme: darkTheme
      })
      const fitAddon = new FitAddon()
      this.$_fitAddon = fitAddon
      term.loadAddon(fitAddon)
      term.open(this.$refs.terminal)

      this.testMessage()

      this.$nextTick(this.fit)
      window.addEventListener('resize', this.onWindowResize)
      document.addEventListener('PageDrawerResize', this.onPageDrawerResize)
    },
    testMessage() {
      const term = this.$_terminal
      // term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
      term.writeln('welcome to Terminal!')
      term.writeln('init log ~')

      let i = 1
      while (i < 100) {
        this.setContent(`To use an xterm.js addon, you have to: ${ i }`)
        i++
      }
      term.writeln('END~')
    },
    onPageDrawerResize(event) {
      let { height } = event.detail
      this.$refs.terminal.style.setProperty('height', `${ height - 100 }px`)
      this.fit()
    },
    onWindowResize() {
      this.fit()
    },
    setContent (value, ln = true) {
      if (value.indexOf('\n') !== -1) {
        value.split('\n').forEach(
            t => this.setContent(t)
        )
        return
      }
      if (typeof value === 'string') {
        this.$_terminal[ln ? 'writeln' : 'write'](value)
      } else {
        this.$_terminal.writeln('')
      }
    },
    addLog (log) {
      this.setContent(log.text, log.type === 'stdout')
    },
    clear () {
      this.$_terminal.clear()
    },
    async fit () {
      const term = this.$_terminal
      term.element.style.display = 'none'
      await this.$nextTick()
      this.$_fitAddon.fit()
      term.element.style.display = ''
      term.refresh(0, term.rows - 1)
    },
  },
}
</script>

<style lang="scss" scoped>
.xterm-view {
  //padding: $p;
  background: #1d2935;
  border-radius: $br;
  width: 100%;
  height: 100%;
  box-sizing: initial;
  line-height: normal;

  .xterm-view-content {
    position: relative;
    padding: 10px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    min-height: 400px;

    :deep() {
      .xterm-dom-renderer-owner-1 .xterm-rows {
        padding: 15px;
        font-size: 14px;
      }
    }
  }
}
</style>
