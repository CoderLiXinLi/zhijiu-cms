import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface ZJRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface ZJRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: ZJRequestInterceptors<T>
  showLoading?: boolean
}
