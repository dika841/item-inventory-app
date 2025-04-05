import { GetInventoryData } from "@/api/inventory/get-inventory-api";
import { TInventoryResponse } from "@/api/inventory/type";
import { TMetaErrorResponse } from "@/common/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetInventoryData = (): UseQueryResult<
  TInventoryResponse[],
  TMetaErrorResponse
> => {
  return useQuery({
    queryKey: ["inventory"],
    queryFn: async () => await GetInventoryData(),
  });
};
