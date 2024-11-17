import { api } from "@/libs/axios/axios-config";
import { TCategoryRequest, TCategoryResponse } from "./type";

export const UpdateCategoryData = async (
  id: string,
  payload: TCategoryRequest
): Promise<TCategoryResponse> => {
  const { data } = await api.put(`/categories/${id}`, payload);
  return data;
};
