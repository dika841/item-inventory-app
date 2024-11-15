export type TInventoryResponse = {
  id: string;
  name: string;
  quantity: number;
  purchasePrice: number;
  sellingPrice: number;
  description?: string;
  categoryId?: number;
  currencyId?: number;
  category?: {
    id: number;
    name: string;
  };
  currency?: {
    id: number;
    name: string;
    symbol: string;
  };
};
