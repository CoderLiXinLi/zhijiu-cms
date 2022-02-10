import { createApp } from 'vue'
import App from './App.vue'

import 'normalize.css'
import './assets/css/index.less'

import router from './router'
import store from './store'

import { globalRegister } from './global'
// import { registerApp } from './global'

const app = createApp(App)
app.use(router).use(store)

// 注册element=plus
// app.use(ElementPlus)
// registerApp(app)
app.use(globalRegister)

app.mount('#app')
