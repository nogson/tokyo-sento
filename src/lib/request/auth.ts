import ENDPOINT from "@/lib/request/endpoint";
import request from "@/lib/request/request";
import { AuthForm } from "@/types/auth";

export const login = async (form: AuthForm) => {
  return await request.post(ENDPOINT.LOGIN, form);
};

export const logout = async () => {
  return await request.post(ENDPOINT.LOGOUT);
};

export const signup = async (form: AuthForm) => {
  return await request.post(ENDPOINT.SIGNUP, form);
};
