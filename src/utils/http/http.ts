import axios, { AxiosInstance, AxiosResponse} from "axios";
import { message } from "antd";
import { store } from "../../store";


const http: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 10000,
});
// 请求拦截器
http.interceptors.request.use(
  (config) => {
    console.log("请求拦截器",config)
    const token = store.getState().authReducer.token
    if(token){
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  }
);

// 响应拦截器
http.interceptors.response.use(
  (response:AxiosResponse) => {
    console.log("响应拦截器",response)
    if(response.data.code != 200){
        message.error(response.data.code + ":" + response.data.message)
        return response
    }
    return response;
  }
);

export default http;
