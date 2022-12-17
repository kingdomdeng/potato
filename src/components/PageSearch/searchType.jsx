import {datePicker_shortcuts} from '@/utils/datePicker'

// { label: '名称', prop: 'device', type: 'input', data: [] },

export function input(model, attr) {
  return (
    <el-form-item prop={attr.prop} key={attr.prop}>
      <el-input v-model={model[attr.prop]} placeholder={attr.label}/>
    </el-form-item>
  )
}

export function select(model, attr) {
  return (
    <el-form-item prop={attr.prop} key={attr.prop}>
      <el-select v-model={model[attr.prop]} placeholder={attr.label}>
        {
          attr.data.map(item => {
            return <el-option key={item.value} {...item}/>
          })
        }
      </el-select>
    </el-form-item>
  )
}

export function radio(model, attr) {
  return (
    <el-form-item label={attr.label} prop={attr.prop} key={attr.prop}>
      <el-radio-group v-model={model[attr.prop]}>
        {
          attr.data.map(item => {
            return  <el-radio key={item.label} {...item} border/>
          })
        }
      </el-radio-group>
    </el-form-item>
  )
}

export function checkbox(model, attr) {
  return (
    <el-form-item label={attr.label} prop={attr.prop} key={attr.prop}>
      <el-checkbox-group v-model={model[attr.prop]}>
        {
          attr.data.map(item => {
            return  <el-checkbox key={item.label} {...item} border/>
          })
        }
      </el-checkbox-group>
    </el-form-item>
  )
}

export function datePicker(model, attr) {
  return (
    <el-form-item label={attr.label} prop={attr.prop} key={attr.prop}>
      <el-date-picker
        v-model={model[attr.prop]}
        type="datetimerange"
        shortcuts={datePicker_shortcuts}
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
      />
    </el-form-item>
  )
}

export default {
  input,
  select,
  radio,
  checkbox,
  datePicker,
}
