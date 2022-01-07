import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

import { globalRegister } from './global'

// import './service/axios_demo'
import zjRequest from './service'

//定义接口类型传到泛型里面
interface DataType {
  data: any
  returnCode: string
  success: boolean
}

zjRequest
  .request<DataType>({
    url: '/home/multidata',
    method: 'GET',
    showLoading: false
  })
  .then((res) => {
    console.log(res.data)
    console.log(res.returnCode)
  })

// zjRequest.request({
//   url: '/home/multidata',
//   method: 'GET',
//   showLoading: false
// })

// 对请求进行单独拦截
// zjRequest.request({
//   url: '/home/multidata',
//   method: 'GET',
//   interceptors: {
//     requestInterceptor: (config) => {
//       console.log('单独请求的config')
//       return config
//     },
//     responseInterceptor: (res) => {
//       console.log('单独响应的response')
//       return res
//     }
//   }
// })

const app = createApp(App)
app.use(router).use(store)

// 注册element=plus
// app.use(ElementPlus)
app.use(globalRegister)

app.mount('#app')
