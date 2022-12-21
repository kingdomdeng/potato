import {datePicker_shortcuts} from '@/utils/datePicker'

// { label: '名称', prop: 'device', type: 'input', formItem: {}, component: {}, data: [] },
/**
 *
 * label: el-form-item的label属性，默认input、select类型的为空，
 * prop： el-form-item、绑定表单的属性
 * type： 组件类型
 * formItem： 第一层，el-form-item的属性赋值
 * component： 第二层，该组件的属性赋值
 * data： 第三层，类似select的这种有子组件的全部属性赋值
 *
 * */

function genWithItem(attr, slots) {
  return (
    <el-form-item prop={attr.prop} key={attr.prop} {...attr.formItem}>
      { slots }
    </el-form-item>
  )
}

export function input(model, attr) {
return genWithItem(attr, (
    <el-input v-model={model[attr.prop]} placeholder={attr.label} {...attr.component}/>
  ))
}

export function select(model, attr) {
  return genWithItem(attr, (
    <el-select v-model={model[attr.prop]} placeholder={attr.label} {...attr.component}>
      {
        attr.data.map(item => {
          return <el-option key={item.value} {...item}/>
        })
      }
    </el-select>
  ))
}

export function radio(model, attr) {
  let newAttr = {
    formItem: { label: attr.label },
    ...attr,
  }
  
  return genWithItem(newAttr, (
    <el-radio-group v-model={model[attr.prop]} {...attr.component}>
      {
        attr.data.map(item => {
          return  (
            <el-radio border key={item.label} {...item}>
              { item.slots ? item.slots : null }
            </el-radio>
          )
        })
      }
    </el-radio-group>
  ))
}

export function checkbox(model, attr) {
  let newAttr = {
    formItem: { label: attr.label },
    ...attr,
  }
  
  return genWithItem(newAttr, (
    <el-checkbox-group v-model={model[attr.prop]} {...attr.component}>
      {
        attr.data.map(item => {
          return (
            <el-checkbox border key={item.label} {...item}>
              { item.slots ? item.slots : null }
            </el-checkbox>
          )
        })
      }
    </el-checkbox-group>
  ))
}

export function datePicker(model, attr) {
  let newAttr = {
    formItem: { label: attr.label },
    ...attr,
  }
  
  return genWithItem(newAttr, (
    <el-date-picker
      v-model={model[attr.prop]}
      type="datetimerange"
      shortcuts={datePicker_shortcuts}
      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      {...attr.component}
    />
  ))
}

export default {
  input,
  select,
  radio,
  checkbox,
  datePicker,
}
