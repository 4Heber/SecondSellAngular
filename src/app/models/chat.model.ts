export interface Message {
  emit: number;
  message: string;
  image?: string;
  seen: boolean;
  created_at: Date;
  chat_id: number;
  id?: number;

}
export interface Offer {
  id?: number;
  emit: number;
  price: number;
  created_at: Date;
  state: number;
  chat_id: number;
  product_id: number;

}
export interface Chat {
  id?: number;
  emit: number;
  product_id: number;
  recept: number;
  closed: boolean;
}
