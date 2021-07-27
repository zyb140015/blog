import axios from 'axios'
import { ElLoading } from "element-plus";
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据，
import Vue from 'vue'
// const BASE_URL = process.env.VUE_APP_API_URL // 第二节配置的url 可以读取 一定要VUE_APP_A为前缀

//loading对象
let loading:any;
  
//当前正在请求的数量
let needLoadingRequestCount = 0;
  
//显示loading
function showLoading(target:string) {
  // 后面这个判断很重要，因为关闭时加了抖动，此时loading对象可能还存在，
  // 但needLoadingRequestCount已经变成0.避免这种情况下会重新创建个loading
  if (needLoadingRequestCount === 0 && !loading) {
    loading = ElLoading.service({
      lock: true,
      text: "Loading...",
      background: "rgba(24, 28, 34, 0.7)",
      target: target || "body",
    });
  }
  needLoadingRequestCount++;
}
  
//隐藏loading
function hideLoading() {
  needLoadingRequestCount--;
  needLoadingRequestCount = Math.max(needLoadingRequestCount, 0); //做个保护
  if (needLoadingRequestCount === 0) {
    //关闭loading
    toHideLoading();
  }
}

const debounce = (fun:Function, delay:number) => {
  let timer:any;
  return (...params:any) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fun(...params);
    }, delay);
  };
};


//防抖：将 300ms 间隔内的关闭 loading 便合并为一次。防止连续请求时， loading闪烁的问题。
var toHideLoading = debounce(()=>{
  loading.close();
  loading = null;
}, 300);

// 创建axios实例
const http = axios.create({
  baseURL: '',
  timeout: 30000, // 请求超时时间     
  headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}                              
})
// 添加request拦截器 
http.interceptors.request.use(config => {
  if (config.headers.showLoading !== false) {
    showLoading(config.headers.loadingTarget);
  }
  return config
}, error => {
  //判断当前请求是否设置了不显示Loading
    hideLoading();
  Promise.reject(error);
})
// 添加respone拦截器
http.interceptors.response.use(
  response => {
    //判断当前请求是否设置了不显示Loading（不显示自然无需隐藏）
    if (response.config.headers.showLoading !== false) {
      hideLoading();
    }
    if (response.data.code != 0 && response.data.code != 200) {
      // Message.error(response.data.message);
      // Message.error({
      //   message: response.data.message,
      //   duration: 10000000000
      // });
      return Promise.reject(response);
    }
    return Promise.resolve(response.data);
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.log(401)
          break;
        case 403:
          console.log(403)
          break;
        case 404:
          console.log(404)
          break;
        case 500:
          console.log(500)
          break;
      }
    }
    hideLoading();
    // Message.error('请求失败!');
    return Promise.reject(error.response)
  }
)

export function get(url: string, params = {}) {
  return http({
    url,
    method: "GET",
    headers: {},
    params,
  });
}

//封装post请求
export function post(url:string, data = {}) {
  return http({
    url,
    method: "POST",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    data,
  });
}
