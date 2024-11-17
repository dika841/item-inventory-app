import { GetOneCurrencyData } from "@/api/currencies/get-one-currency";
import { TCurrencyResponse } from "@/api/currencies/type";
import { TMetaErrorResponse } from "@/common/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetOneCurrencyData = (
  id: string
): UseQueryResult<TCurrencyResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["get-one-currency", id],
    queryFn: async () => await GetOneCurrencyData(id),
  });
};
