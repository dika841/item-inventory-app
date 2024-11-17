import { api } from "@/libs/axios/axios-config";
import { TCurrencyResponse } from "./type";

export const GetOneCurrencyData = async (
  id: string
): Promise<TCurrencyResponse> => {
  const { data } = await api.get(`/currencies/${id}`);
  return data;
};
