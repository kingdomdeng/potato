// 更多用法 https://github.com/yiminghe/async-validator

const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入备注'))
  } else if (value !== '22') {
    callback(new Error("备注需要等于22"))
  } else {
    callback()
  }
}

export const formRules = {
  /*name: [
    { required: true, message: 'Please input Activity name', trigger: 'change' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],*/
  // remark: [{ validator: validatePass, trigger: 'blur' }],
  appId: [{ required: true, message: '请输入应用名', trigger: 'blur' }],
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
}
