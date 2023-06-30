export type Order = {
  id: number;
  userId: number;
  productIds?: { id: number }[];
};

export type OrderProductIds = {
  id: number;
  userId: number;
  productIds?: number[] | undefined;
};
