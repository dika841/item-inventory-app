import { TAuthLogin, TResponseLogin } from "@/common/types/auth";
import { api } from "@/libs/axios/axios-config";

export const Login = async (loginReq: TAuthLogin): Promise<TResponseLogin> => {
  const res = await api.post("/auth/login", loginReq);
  return res.data;
};
