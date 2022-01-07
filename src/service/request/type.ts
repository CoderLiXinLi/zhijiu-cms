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

// export interface ZJRequestInterceptors {
//   requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
//   requestInterceptorCatch?: (error: any) => any
//   responseInterceptor?: (res: any) => any
//   responseInterceptorCatch?: (error: any) => any
// }

// export interface ZJRequestConfig extends AxiosRequestConfig {
//   interceptors?: ZJRequestInterceptors
//   showLoading?: boolean
// }

// export interface ZJRequestInterceptors {
//   requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
//   requestInterceptorCatch?: (error: any) => any
//   responseInterceptor?: (res: AxiosResponse) => AxiosResponse
//   responseInterceptorCatch?: (error: any) => any
// }

// export interface ZJRequestConfig extends AxiosRequestConfig {
//   interceptors?: ZJRequestInterceptors
//   showLoading?: boolean
// }

// export interface HYRequestInterceptors<T = AxiosResponse> {
//   requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
//   requestInterceptorCatch?: (error: any) => any
//   responseInterceptor?: (res: T) => T
//   responseInterceptorCatch?: (error: any) => any
// }

// export interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
//   interceptors?: HYRequestInterceptors<T>
//   showLoading?: boolean
// }
