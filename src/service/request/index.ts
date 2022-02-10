import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { ZJRequestInterceptors, ZJRequestConfig } from '../request/type'

import { ElLoading } from 'element-plus'
import 'element-plus/lib/components/loading/style/css'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'
const DEAFULT_LOADING = true

class ZJRequest {
  instance: AxiosInstance
  interceptors?: ZJRequestInterceptors
  loading?: LoadingInstance
  showLoading: boolean

  constructor(config: ZJRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)

    //保存配置信息
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEAFULT_LOADING

    // 1.添加ZJRequest示例的拦截器
    // 从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 2.添加所有的实例都有的拦截器
    // request拦截器的执行顺序是后添加的先执行
    // response拦截器的执行顺序是先添加的先执行
    // 如果业务上需要,可以把自己添加的config里的拦截器调换顺序
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据....',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        console.log('所有的实例都有的拦截器: 请求成功拦截')
        return config
      },
      (err) => {
        console.log('所有的实例都有的拦截器: 请求失败拦截')
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有的实例都有的拦截器: 响应成功拦截')
        // const data = res.data
        // if (data.returnCode === '-1001') {
        //   console.log('请求数据失败,错误信息:xxx')
        // } else {
        //   return data
        // }

        // 将loading移除
        this.loading?.close()

        return res.data
      },
      (err) => {
        // 这里判断不用httpErrorCode显示不同的错误信息
        // if (err.response.status === 404) {
        //   console.log('404错误-megXXX')
        // }

        // 将loading移除
        this.loading?.close()

        console.log('所有的实例都有的拦截器: 响应失败拦截')
        return err
      }
    )
  }

  //使用promise返回对应的数据,并使用泛型
  request<T>(config: ZJRequestConfig<T>): Promise<T> {
    return new Promise((resolve, regect) => {
      // 3.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 4.判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 3.单个请求对响应response的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }

          // 4.将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING

          // 5.将结果resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          // 4.将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING
          regect(err)
          return err
        })
    })
  }

  get<T>(config: ZJRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: ZJRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: ZJRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: ZJRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default ZJRequest
