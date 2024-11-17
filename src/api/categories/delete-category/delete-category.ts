import { api } from "@/libs/axios/axios-config";
import { TCategoryResponse } from "../get-category-data/type";

export const DeleteCategoryData = async (
  id: string
): Promise<TCategoryResponse> => {
  const { data } = await api.delete(`/categories/${id}`);
  return data;
};
