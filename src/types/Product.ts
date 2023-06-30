export type Product = {
  id: number;
  name: string | boolean | number;
  price: string | boolean | number;
  orderId: number | null;
};

export type ProductResponse = {
  id: number;
  name: string | boolean | number;
  price: string | boolean | number;
};

export type ProductParams = {
  name: string | boolean | number;
  price: string | boolean | number; 
  orderId: number | null;
};
