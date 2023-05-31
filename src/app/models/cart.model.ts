
export interface Cart {
  id?: number;
  userId: number;
}
export interface ProductCart {
  id?: number;
  cartId: number;
  productId: number;
  price: number;
}
