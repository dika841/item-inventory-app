export type TInventoryResponse = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  description?: string;
  categoryId?: number;
  category?: {
    id: number;
    name: string;
  };
};
