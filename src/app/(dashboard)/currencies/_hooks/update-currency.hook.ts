import { TCurrencyRequest, TCurrencyResponse } from "@/api/currencies/type";
import { UpdateCurrencyData } from "@/api/currencies/update-currency";
import { TMetaErrorResponse } from "@/common/types";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

type UpdateCurrencyParams = {
  id: string;
  payload: TCurrencyRequest;
};

export const useUpdateCurrency = (): UseMutationResult<
  TCurrencyResponse,
  TMetaErrorResponse,
  UpdateCurrencyParams,
  unknown
> =>
  useMutation({
    mutationKey: ["update-currency"],
    mutationFn: async ({ id, payload }) =>
      await UpdateCurrencyData(id, payload),
  });
