import { api } from "@/libs/axios/axios-config";
import { TCategoryResponse } from "../type";

export const GetCategoryData = async (): Promise<TCategoryResponse[]> => {
  const { data } = await api.get("/categories");
  return data;
};
