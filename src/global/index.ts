import { App } from 'vue'
import registerElement from './register-element'

//app.use 默认执行其中的函数并且传入app对象
/**
 * 传入方法时
  app.use(function(app:App)){
  }
  * 传入 对象时
    app.use({
    install:function(app:App){
    }
  })
 */

export function globalRegister(app: App): void {
  // registerElement(app) 这么写也是可以的
  app.use(registerElement)
}

// export function registerApp(app: App): void {
//   registerElement(app)
//   //在此处还可以注册其他内容 组件
//   // registerOther()
// }
