
export interface Cart {
  id?: number;
  user_id: number;
}
export interface ProductCart {
  id?: number;
  cartId: number;
  product_id: number;
  price: number;
}
