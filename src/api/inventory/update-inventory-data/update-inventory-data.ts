import { api } from "@/libs/axios/axios-config";
import { TInventoryResponse } from "../get-inventory-data/type";
import { TInventoryRequest } from "../post-inventory-data/type";

export const UpdateInventoryData = async (
  id: string,
  payload: TInventoryRequest
): Promise<TInventoryResponse> => {
  const { data } = await api.put(`/inventory/${id}`, payload);
  return data;
};
