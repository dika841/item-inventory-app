import { GetOneInventoryData } from "@/api/inventory/get-one-inventory-data";
import { TInventoryResponse } from "@/api/inventory/type";
import { TMetaErrorResponse } from "@/common/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetOneInventoryData = (
  id: string
): UseQueryResult<TInventoryResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["get-one-inventory", id],
    queryFn: async () => await GetOneInventoryData(id),
  });
};
