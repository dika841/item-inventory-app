import { api } from "@/libs/axios/axios-config";
import { TCategoryResponse } from "../get-category-data/type";
import { TCategoryRequest } from "./type";

export const PostCategoryData = async (
  payload: TCategoryRequest
): Promise<TCategoryResponse> => {
  const { data } = await api.post("/categories", payload);
  return data;
};
