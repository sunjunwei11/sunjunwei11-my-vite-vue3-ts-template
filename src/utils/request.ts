import axios from 'axios';
import { ElMessage } from 'element-plus';

// 创建请求实例
const instance = axios.create({
  baseURL: '/api',
  // 指定请求超时的毫秒数
  timeout: 3000,
  // 表示支持跨域请求携带Cookie
  // 同时需要后台配合，返回需要有以下字段
  // Access-Control-Allow-Credentials: true
  // Access-Control-Allow-Origin: 当前页面的域名
  withCredentials: true,
});

// 前置拦截器（发起请求之前的拦截）
instance.interceptors.request.use(
  (config) => {
    /**
     * 在这里一般会携带前台的参数发送给后台，比如下面这段代码：
     * const token = getToken()
     * if (token) {
     *  config.headers.token = token
     * }
     */
    return config;
  },
  (error) => {
    const errorMsg = error?.message || 'Request Error';
    ElMessage({
      message: errorMsg,
      type: 'error',
    });
    return Promise.reject(error);
  }
);

// 后置拦截器（获取到响应时的拦截）
instance.interceptors.response.use(
  (response) => {
    // 这里我们将后台返回的数据解构出来返回，方便后续获取
    const { data } = response;
    return data;
    // 这里根据其它业务可以做其它特殊的拦截，比如根据后台返回的data有固定的格式，根据后台返回的code可以做一些统一处理，比如像下面这样
    // const { code, message, data } = response.data;

    // // 根据自定义错误码判断请求是否成功
    // if (code === 0) {
    //   // 将组件用的数据返回
    //   return data;
    // } else {
    //   // 处理业务错误。
    //   ElMessage({
    //     message: message,
    //     type: 'error',
    //   });
    //   return Promise.reject(new Error(message));
    // }
  },
  (error) => {
    const { response } = error;
    // 处理 HTTP 网络错误
    let message = '';
    // HTTP 状态码
    const status = response?.status;
    switch (status) {
      case 401:
        message = 'token 失效，请重新登录';
        // 这里可以触发退出的 action
        break;
      case 403:
        message = '拒绝访问';
        break;
      case 404:
        message = '请求地址错误';
        break;
      case 500:
        message = '服务器故障';
        break;
      default:
        message = '网络连接故障';
    }

    ElMessage({
      message: message,
      type: 'error',
    });
    return Promise.reject(error);
  }
);

// 导出常用函数

/**
 * @param {string} url
 * @param {object} data
 * @param {object} params
 */
export function post<T>(url: string, data = {}, params = {}): Promise<T> {
  return instance({
    method: 'post',
    url,
    data,
    params,
  });
}

/**
 * @param {string} url
 * @param {object} params
 */
export function get<T>(url: string, params = {}): Promise<T> {
  return instance({
    method: 'get',
    url,
    params,
  });
}

/**
 * @param {string} url
 * @param {object} data
 * @param {object} params
 */
export function put<T>(url: string, data = {}, params = {}): Promise<T> {
  return instance({
    method: 'put',
    url,
    params,
    data,
  });
}

/**
 * @param {string} url
 * @param {object} params
 */
export function _delete<T>(url: string, params = {}): Promise<T> {
  return instance({
    method: 'delete',
    url,
    params,
  });
}

export default instance;
