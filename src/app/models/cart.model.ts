
export interface Cart {
  id?: number;
  userId: number;
}
export interface ProductCart {
  id?: number;
  cartId: number;
  product_id: number;
  price: number;
}
