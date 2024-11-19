import { PostInventoryData } from "@/api/inventory/post-inventory-data";
import { TInventoryRequest, TInventoryResponse } from "@/api/inventory/type";
import { TMetaErrorResponse } from "@/common/types";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const useCreateInventory = (): UseMutationResult<
  TInventoryResponse,
  TMetaErrorResponse,
  TInventoryRequest,
  unknown
> =>
  useMutation({
    mutationKey: ["create-inventory"],
    mutationFn: async (payload) => await PostInventoryData(payload),
  });
