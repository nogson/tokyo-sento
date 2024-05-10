import axios from "axios";
import { useTokenStore } from "@/store";

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 2000,
});

instance.interceptors.request.use(
  (request) => {
    const token = useTokenStore.getState().token;
    if (token) {
      request.headers.authorization = `${token}`;
    }
    return request;
  },
  (error) => {
    // console.log("request", error);
    if (error.response.status === 401) {
      useTokenStore.setState({ token: "" });
    }
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // console.log("response", error);
    return Promise.reject(error);
  }
);

const request = {
  get: async (url: string) => {
    try {
      return await instance.get(url);
    } catch (error) {
      console.log(error);
    }
  },
  post: async (url: string, data?: any) => {
    return await instance.post(url, data);
  },
  put: async (url: string, data: any) => {
    return await instance.put(url, data);
  },
  delete: async (url: string) => {
    return await instance.delete(url);
  },
};

export default request;
