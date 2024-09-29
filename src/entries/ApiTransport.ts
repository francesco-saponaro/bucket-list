import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
axios.defaults.baseURL = 'http://localhost:3000/';
const token = localStorage.getItem('token');
axios.defaults.headers.common["Authorization"] = token;
const axiosInstance = axios.create();
export class Api {
  setAuthorizationHeader(token: string): void {
    axiosInstance.defaults.headers.common["Authorization"] = token;
  }

  resetAuthorizationHeader(): void {
    axiosInstance.defaults.headers.common["Authorization"] = localStorage.getItem('token');
  }

  removeAuthHeader(): void {
    axiosInstance.defaults.headers.common["Authorization"] = null;
  };

  static getInstance(): Api {
    return new Api();
  }

  get(url: string, options?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
    return axiosInstance.get(url, {
      ...options,
    });
  }

  put(url: string, data: any, options?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
    return axiosInstance.put(url, data, {
      ...options,
    });
  }

  post(url: string, data: any, options?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
    console.log(options, 'options')
    return axiosInstance.post(url, data, {
      ...options,
    });
  }

  patch(url: string, data: any, options?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
    return axiosInstance.patch(url, data, {
      ...options,
    });
  }

  delete(url: string, options?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
    return axiosInstance.delete(url, {
      ...options,
    });
  }
}


// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   // const { paramToken } = useSessionStore.getState();
//   config.headers.Authorization = token;
//   return config;
// });