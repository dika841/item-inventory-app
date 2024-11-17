import { api } from "@/libs/axios/axios-config";
import { TInventoryRequest, TInventoryResponse } from "./type";

export const PostInventoryData = async (
  payload: TInventoryRequest
): Promise<TInventoryResponse> => {
  const { data } = await api.post("/inventory", payload);
  return data;
};
