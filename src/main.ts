import { createApp } from 'vue'
import App from './App.vue'

import 'normalize.css'
import './assets/css/index.less'

import router from './router'
import store from './store'

import { globalRegister } from './global'
// import { registerApp } from './global'

import { setupStore } from '@/store'

const app = createApp(App)
app.use(router).use(store)

// 注册element=plus
// app.use(ElementPlus)
// registerApp(app)
app.use(globalRegister)
// 同步本地缓存数据到vuex
setupStore()

app.mount('#app')
