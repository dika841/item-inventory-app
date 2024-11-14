import { GetCategoryData } from "@/api/get-category-data/get-category-api";
import { TCategoryResponse } from "@/api/get-category-data/type";
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
