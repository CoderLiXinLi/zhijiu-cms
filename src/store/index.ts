import { createStore } from 'vuex'
import login from './login/login'
// import { ILoginState } from './type'

const store = createStore({
  state: () => {
    return {
      token: '',
      userInfo: {}
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    login
  }
})

//防止当用户登录成功之后,刷新页面,而一旦刷新页面之后,在登录时候调用接口保存到vuex的数据会清空
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export default store
