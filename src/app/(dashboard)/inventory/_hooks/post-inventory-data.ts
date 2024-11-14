import { TInventoryResponse } from "@/api/inventory/get-inventory-data/type";
import { PostInventoryData } from "@/api/inventory/post-inventory-data/post-inventory-data";
import { TInventoryRequest } from "@/api/inventory/post-inventory-data/type";
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
