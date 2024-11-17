import { api } from "@/libs/axios/axios-config";
import { TInventoryRequest, TInventoryResponse } from "./type";

export const UpdateInventoryData = async (
  id: string,
  payload: TInventoryRequest
): Promise<TInventoryResponse> => {
  const { data } = await api.put(`/inventory/${id}`, payload);
  return data;
};
