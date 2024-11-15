import { api } from "@/libs/axios/axios-config";
import { TCurrencyResponse } from "./type";

export const GetCurrencyData = async (): Promise<TCurrencyResponse[]> => {
  const { data } = await api.get("/currency");
  return data;
};
