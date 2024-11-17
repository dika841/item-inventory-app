import { GetCategoryData } from "@/api/categories/get-category-api";
import { TCategoryResponse } from "@/api/categories/type";
import { TMetaErrorResponse } from "@/common/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetCategoryData = (): UseQueryResult<
  TCategoryResponse[],
  TMetaErrorResponse
> => {
  return useQuery({
    queryKey: ["category"],
    queryFn: async () => await GetCategoryData(),
  });
};
