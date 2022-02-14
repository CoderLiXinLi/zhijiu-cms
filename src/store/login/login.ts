import { Module } from 'vuex'
import { ILoginState } from './type'
import { accountLoginRequest, rquestUserInfoById, rquestUserMenusById } from '@/service/login/login'
import { IAccount } from '@/service/login/type'
import { IRootState } from '../types'
import LocalCache from '@/utils/cache'
import router from '@/router'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      //1.实现登录逻辑
      const loginReuslt = await accountLoginRequest(payload)
      // console.log(loginReuslt.data.id, loginReuslt.data.token)
      const { id, token } = loginReuslt.data
      commit('changeToken', token)
      LocalCache.setCache('token', token)

      //2. 请求用户信息jiekou
      const userInfoReuslt = await rquestUserInfoById(id)
      const userInfo = userInfoReuslt.data
      commit('changeUserInfo', userInfo)
      LocalCache.setCache('userInfo', userInfo)

      //3. 请求用户菜单
      const userMenusResult = await rquestUserMenusById(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      LocalCache.setCache('userMenus', userMenus)

      // 4.跳转到首页
      router.push('/main')
    },
    accountPhoneAction({ commit }, payload: any) {
      console.log('accountPhoneAction', payload)
    },
    loadLocalLogin({ commit }) {
      const token = LocalCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = LocalCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = LocalCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
