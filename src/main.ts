import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

import { globalRegister } from './global'

const app = createApp(App)
app.use(router).use(store)

// 注册element=plus
// app.use(ElementPlus)
app.use(globalRegister)

app.mount('#app')
