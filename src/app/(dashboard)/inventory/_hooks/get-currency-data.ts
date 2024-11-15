import { GetCurrencyData } from "@/api/get-currency-data/get-currency-data";
import { TCurrencyResponse } from "@/api/get-currency-data/type";
import { TMetaErrorResponse } from "@/common/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetCurrencyData = (): UseQueryResult<
  TCurrencyResponse[],
  TMetaErrorResponse
> => {
  return useQuery({
    queryKey: ["currency"],
    queryFn: async () => await GetCurrencyData(),
  });
};
