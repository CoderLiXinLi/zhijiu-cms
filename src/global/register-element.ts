import type { App } from 'vue'
import * as Icons from '@element-plus/icons-vue'
import 'element-plus/es/components/message/style/css'

import {
  ElTable,
  ElButton,
  ElTabs,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElCheckbox,
  ElLink
} from 'element-plus'

const components = [ElTable, ElButton, ElTabs, ElTabPane, ElForm, ElFormItem, ElCheckbox, ElLink]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }

  // 注册icons全局组件
  Object.keys(Icons).forEach((key) => {
    app.component(key, Icons[key as keyof typeof Icons])
  })
}
