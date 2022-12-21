/**
 * dialogMixin
 * 有需要就重写函数, $dialogMixin_open 或 open
 * pageMixin默认打开的是open，所以增加close，open两个函数命名不带前缀
 * 特殊不带前缀： form、close、open
 * form一般会重写
 *
 * 使用： <el-dialog v-bind="dialogMixin_dialog"></el-dialog>
 * */

const ACTION_TYPE = {
  'add': '新增',
  'edit': '编辑',
  'view': '查看',
}

export default {
  emits: [
    'callback',
    'open',
    'close',
  ],
  data() {
    return {
      form: {},
      dialogMixin_visible: false,
      dialogMixin_type: 'view',
      dialogMixin_title: '',
    }
  },
  watch: {
    dialogMixin_type (val) {
      this.dialogMixin_title = ACTION_TYPE[val]
    }
  },
  computed: {
    dialogMixin_isAdd() {
      return this.dialogMixin_type === 'add'
    },
    
    dialogMixin_dialog() {
      return {
        modelValue: this.dialogMixin_visible,
        title: this.dialogMixin_title,
        onClose: this.$dialogMixin_close,
      }
    },
  },
  methods: {
    open({type, data}) {
      this.$dialogMixin_open({type, data})
    },
    
    close() {
      this.$dialogMixin_close()
    },
    
    $dialogMixin_setForm (data) {
      if (!data) return

      Object.assign(this.$data.form, this.$options.data().form)
      Object.keys(data).forEach(attr => {
        if (this.form.hasOwnProperty(attr)) {
          this.form[attr] = data[attr]
        }
      })
    
      this.$nextTick(() => {
        this.$refs?.form?.clearValidate()
      })
    },
    
    $dialogMixin_open({type, data}) {
      this.dialogMixin_visible = true
      this.dialogMixin_type = type
      this.$dialogMixin_setForm(data)
      this.$emit('open')
    },
    
    $dialogMixin_close() {
      // 重置组件数据
      Object.assign(this.$data, this.$options.data())
      this.$emit('close')
    },
    
    $dialogMixin_verify() {
      let form = this.$refs.form.context
      return new Promise((res, rej) => {
        form.validate((valid) => {
          if (valid) {
            res(true)
          } else {
            rej(false)
          }
        })
      })
    },
    
  }
}
