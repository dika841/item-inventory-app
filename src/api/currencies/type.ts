export type TCurrencyResponse = {
  id: string;
  name: string;
  symbol: string;
  exchangeRate: number;
  code?: string;
  isDefault?: boolean;
};
export type TCurrencyRequest = {
  id: string;
  name: string;
  symbol: string;
  code: string;
  exchangeRate: number;
};
