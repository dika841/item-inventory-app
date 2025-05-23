import { TInventoryRequest, TInventoryResponse } from "@/api/inventory/type";
import { UpdateInventoryData } from "@/api/inventory/update-inventory-data";
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
