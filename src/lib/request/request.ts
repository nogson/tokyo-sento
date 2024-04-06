import axios from "axios";

const request = {
  get: async (url: string) => {
    return await axios.get(url);
  },
  post: async (url: string, data?: any) => {
    return await axios.post(url, data);
  },
  put: async (url: string, data: any) => {
    return await axios.put(url, data);
  },
  delete: async (url: string) => {
    return await axios.delete(url);
  },
};

export default request;
