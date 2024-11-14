import { api } from "@/libs/axios/axios-config";
import { TInventoryResponse } from "./type";

export const GetInventoryData = async (): Promise<TInventoryResponse> => {
  const { data } = await api.get("/inventory");
  return data;
};
