import { TCategoryResponse } from "@/api/categories/get-category-data/type";
import { GetOneCategoryData } from "@/api/categories/get-one-category/get-one-category";
import { TMetaErrorResponse } from "@/common/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetOneCategoryData = (
  id: string
): UseQueryResult<TCategoryResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["get-one-category", id],
    queryFn: async () => await GetOneCategoryData(id),
  });
};
