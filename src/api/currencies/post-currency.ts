import { api } from "@/libs/axios/axios-config";
import { TCurrencyRequest, TCurrencyResponse } from "./type";

export const PostCurrencyData = async (
  payload: TCurrencyRequest
): Promise<TCurrencyResponse> => {
  const { data } = await api.post("/currencies", payload);
  return data;
};
