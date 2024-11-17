import { TCategoryResponse } from "@/api/categories/get-category-data/type";
import { TCategoryRequest } from "@/api/categories/post-category/type";
import { UpdateCategoryData } from "@/api/categories/update-category/update-category";
import { TMetaErrorResponse } from "@/common/types";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

type UpdateCategoryParams = {
  id: string;
  payload: TCategoryRequest;
};

export const useUpdateCategory = (): UseMutationResult<
  TCategoryResponse,
  TMetaErrorResponse,
  UpdateCategoryParams,
  unknown
> =>
  useMutation({
    mutationKey: ["update-category"],
    mutationFn: async ({ id, payload }) =>
      await UpdateCategoryData(id, payload),
  });
