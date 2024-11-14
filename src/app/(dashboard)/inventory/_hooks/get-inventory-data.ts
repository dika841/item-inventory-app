import { GetInventoryData } from "@/api/inventory/get-inventory-data/get-inventory-api";
import { TInventoryResponse } from "@/api/inventory/get-inventory-data/type";
import { TMetaErrorResponse } from "@/common/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetInventoryData = (): UseQueryResult<
  TInventoryResponse,
  TMetaErrorResponse
> => {
  return useQuery({
    queryKey: ["inventory"],
    queryFn: async () => await GetInventoryData(),
  });
};
