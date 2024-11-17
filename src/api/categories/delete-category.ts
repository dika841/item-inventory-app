import { api } from "@/libs/axios/axios-config";
import { TCategoryResponse } from "./type";

export const DeleteCategoryData = async (
  id: string
): Promise<TCategoryResponse> => {
  const { data } = await api.delete(`/categories/${id}`);
  return data;
};
