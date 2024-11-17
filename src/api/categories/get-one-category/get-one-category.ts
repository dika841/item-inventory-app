import { api } from "@/libs/axios/axios-config";
import { TCategoryResponse } from "../get-category-data/type";

export const GetOneCategoryData = async (
  id: string
): Promise<TCategoryResponse> => {
  const { data } = await api.get(`/categories/${id}`);
  return data;
};
