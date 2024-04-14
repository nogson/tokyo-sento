import axios from "axios";

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 2000,
});

instance.interceptors.request.use(
  (request) => {
    if (localStorage.getItem("token")) {
      request.headers.authorization = `${localStorage.getItem("token")}`;
    }
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
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
