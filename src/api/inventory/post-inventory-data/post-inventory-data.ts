import { api } from "@/libs/axios/axios-config";
import { TInventoryResponse } from "../get-inventory-data/type";
import { TInventoryRequest } from "./type";

export const PostInventoryData = async (
  payload: TInventoryRequest
): Promise<TInventoryResponse> => {
  const { data } = await api.post("/inventory", payload);
  return data;
};
