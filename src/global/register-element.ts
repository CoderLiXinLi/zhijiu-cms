import type { App } from 'vue'

import { ElTable, ElButton } from 'element-plus'

const components = [ElTable, ElButton]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}