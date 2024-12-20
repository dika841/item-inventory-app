import { DeleteCategoryData } from "@/api/categories/delete-category";
import { TCategoryResponse } from "@/api/categories/type";
import { TMetaErrorResponse } from "@/common/types";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const useDeleteCategoryData = (): UseMutationResult<
  TCategoryResponse,
  TMetaErrorResponse,
  string,
  unknown
> =>
  useMutation({
    mutationKey: ["delete-category"],
    mutationFn: async (id) => await DeleteCategoryData(id),
  });
