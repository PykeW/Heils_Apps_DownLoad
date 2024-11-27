import http from "./http"

interface APIResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

export async function get<T = any>(
  url: string, 
  params?: Record<string, any>
): Promise<APIResponse<T>> {
  try {
    return await http.get(url, { params });
  } catch (error) {
    console.log("get请求失败",error)
    throw error;
  }
}

export function post(url:string,params:object):Promise<APIResponse>{
  return http.post(url,params)
}