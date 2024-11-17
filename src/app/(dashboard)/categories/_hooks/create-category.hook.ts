import { TCategoryResponse } from "@/api/categories/get-category-data/type";
import { PostCategoryData } from "@/api/categories/post-category/post-category";
import { TCategoryRequest } from "@/api/categories/post-category/type";
import { TMetaErrorResponse } from "@/common/types";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const useCreateCategory = (): UseMutationResult<
  TCategoryResponse,
  TMetaErrorResponse,
  TCategoryRequest,
  unknown
> =>
  useMutation({
    mutationKey: ["create-category"],
    mutationFn: async (payload) => await PostCategoryData(payload),
  });
