import ENDPOINT from "@/lib/request/endpoint";
import request from "@/lib/request/request";
import { AuthForm } from "@/types/auth";

export const login = async (form: AuthForm) => {
  const res = await request.post(ENDPOINT.LOGIN, form);
  localStorage.setItem("token", res.headers.authorization);

  return res;
};

export const logout = async (form: AuthForm) => {
  const res = await request.post(ENDPOINT.LOGOUT, form);
  localStorage.removeItem("token");
  return res;
};

export const signUp = async (form: AuthForm) => {
  return await request.post(ENDPOINT.SIGNUP, form);
};
