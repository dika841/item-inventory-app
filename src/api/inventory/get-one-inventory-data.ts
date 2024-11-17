import { api } from "@/libs/axios/axios-config";
import { TInventoryResponse } from "./type";

export const GetOneInventoryData = async (
  id: string
): Promise<TInventoryResponse> => {
  const { data } = await api.get(`/inventory/${id}`);
  return data;
};
