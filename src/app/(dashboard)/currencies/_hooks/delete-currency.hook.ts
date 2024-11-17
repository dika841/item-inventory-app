import { DeleteCurrencyData } from "@/api/currencies/delete-currency";
import { TCurrencyResponse } from "@/api/currencies/type";
import { TMetaErrorResponse } from "@/common/types";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const useDeleteCurrency = (): UseMutationResult<
  TCurrencyResponse,
  TMetaErrorResponse,
  string,
  unknown
> =>
  useMutation({
    mutationKey: ["delete-currency"],
    mutationFn: async (id) => await DeleteCurrencyData(id),
  });
