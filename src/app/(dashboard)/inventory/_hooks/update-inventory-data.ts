import { TInventoryResponse } from "@/api/inventory/get-inventory-data/type";
import { TInventoryRequest } from "@/api/inventory/post-inventory-data/type";
import { UpdateInventoryData } from "@/api/inventory/update-inventory-data/update-inventory-data";
import { TMetaErrorResponse } from "@/common/types";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

type UpdateInventoryParams = {
  id: string;
  payload: TInventoryRequest;
};

export const useUpdateInventory = (): UseMutationResult<
  TInventoryResponse,
  TMetaErrorResponse,
  UpdateInventoryParams,
  unknown
> =>
  useMutation({
    mutationKey: ["update-inventory"],
    mutationFn: async ({ id, payload }) =>
      await UpdateInventoryData(id, payload),
  });
