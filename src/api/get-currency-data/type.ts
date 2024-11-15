export type TCurrencyResponse = {
  id: string;
  name: string;
  symbol: string;
  exchangeRate: number;
  code?: string;
  isDefault?: boolean;
};
