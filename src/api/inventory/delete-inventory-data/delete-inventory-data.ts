import { api } from "@/libs/axios/axios-config";
import { TInventoryResponse } from "../get-inventory-data/type";

export const DeleteInventoryData = async (
  id: string
): Promise<TInventoryResponse> => {
  const { data } = await api.delete(`/inventory/${id}`);
  return data;
};
