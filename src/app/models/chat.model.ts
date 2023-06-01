export interface Message {
  emit: number;
  message: string;
  image?: string;
  seen: boolean;
  created_at: Date;
  chatId: number;
  id?: number;

}
export interface Offer {
  id?: number;
  emit: number;
  price: number;
  created_at: Date;
  state: number;
  chatId: number;
  productId: number;

}
export interface Chat {
  id?: number;
  emit: number;
  productID: number;
  recept: number;
  closed: boolean;
}
