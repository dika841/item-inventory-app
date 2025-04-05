import { TResponse } from "..";

export type TAccount = {
  id: string;
  name: string;
  email: string;
};

export type TAuthUser = {
  id?: string;
  expiredAt?: string;
  token?: string;
  user: TAccount;
};
export type TAuthLogin = {
  email?: string;
  password?: string;
};
export type TResponseAccount = TResponse<TAccount>;
export type TResponseLogin = TResponse<TAuthUser>;
