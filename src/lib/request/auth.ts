import ENDPOINT from "@/lib/request/endpoint";
import request from "@/lib/request/request";
import { AuthForm } from "@/types/auth";
import { useTokenStore } from "@/store";

export const login = async (form: AuthForm) => {
  const res = await request.post(ENDPOINT.LOGIN, form);
  useTokenStore.setState({ token: res.headers.authorization });
  return res;
};

export const logout = async () => {
  const res = await request.post(ENDPOINT.LOGOUT);
  useTokenStore.setState({ token: "" });
  return res;
};

export const signUp = async (form: AuthForm) => {
  return await request.post(ENDPOINT.SIGNUP, form);
};

export const refreshToken = async () => {
  console.log("refreshToken");
  const res = await request.post(ENDPOINT.REFRESH_TOKEN);
  useTokenStore.setState({ token: res.headers.authorization });
  return res;
};
