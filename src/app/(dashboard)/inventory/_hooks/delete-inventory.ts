import { DeleteInventoryData } from "@/api/inventory/delete-inventory-data/delete-inventory-data";
import { TInventoryResponse } from "@/api/inventory/get-inventory-data/type";
import { TMetaErrorResponse } from "@/common/types";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const useDeleteInventoryData = (): UseMutationResult<
  TInventoryResponse,
  TMetaErrorResponse,
  string,
  unknown
> =>
  useMutation({
    mutationKey: ["delete-inventory"],
    mutationFn: async (id) => await DeleteInventoryData(id),
  });
