import { TMetaErrorResponse } from "@/common/types";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { TCurrencyRequest, TCurrencyResponse } from "@/api/currencies/type";
import { PostCurrencyData } from "@/api/currencies/post-currency";

export const useCreateCurrency = (): UseMutationResult<
  TCurrencyResponse,
  TMetaErrorResponse,
  TCurrencyRequest,
  unknown
> =>
  useMutation({
    mutationKey: ["create-currency"],
    mutationFn: async (payload) => await PostCurrencyData(payload),
  });
