export interface Order {
  id?: number;
  buyer: number;
  price: number,
  seller: number;
  created_at: Date;
  productId: number;

}
