import zjRequest from '../index'
import { IAccount, ILoginResult, IDataType } from './type'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/' // 用法: role/1/menu
}

export function accountLoginRequest(account: IAccount) {
  return zjRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    // body的请求参数 是放到 data 字段里面
    data: account
  })
}

export function rquestUserInfoById(id: number) {
  return zjRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

export function rquestUserMenusById(id: number) {
  return zjRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
