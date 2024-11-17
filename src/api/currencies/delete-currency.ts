import { api } from "@/libs/axios/axios-config";
import { TCurrencyResponse } from "./type";

export const DeleteCurrencyData = async (
  id: string
): Promise<TCurrencyResponse> => {
  const { data } = await api.delete(`/currencies/${id}`);
  return data;
};
