import { api } from "@/libs/axios/axios-config";
import { TCurrencyRequest, TCurrencyResponse } from "./type";

export const UpdateCurrencyData = async (
  id: string,
  payload: TCurrencyRequest
): Promise<TCurrencyResponse> => {
  const { data } = await api.put(`/currencies/${id}`, payload);
  return data;
};
