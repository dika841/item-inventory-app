import { GetOneCategoryData } from "@/api/categories/get-one-category";
import { TCategoryResponse } from "@/api/categories/type";
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
