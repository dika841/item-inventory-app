import { TCategoryRequest, TCategoryResponse } from "@/api/categories/type";
import { PostCategoryData } from "@/api/categories/post-category";
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
