
import axios from 'axios'

axios.defaults.baseURL = 'http://47.96.21.88:8086/';
// 请求拦截器
axios.interceptors.request.use(function(config) {
  // 如果是登录接口，是不需要携带token
  if(!config.url.endsWith('/login')) {
    // 在请求头携带token
    config.headers.Authorization = sessionStorage.getItem('mytoken');
  }
  return config;
});
// 响应拦截器
axios.interceptors.response.use(function(res) {
  // 对响应的数据结果进行加工处理
  return res.data;
});

export default axios
