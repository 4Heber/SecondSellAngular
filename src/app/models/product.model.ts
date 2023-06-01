
export interface Product {
  id?: number;
  created_at: Date;
  updated_at: Date;
  name: string;
  description: string;
  state: string;
  photo?: any;
  price: number;
  category_id: number;
  active: boolean;
  buyer_id:any;
  seller_id: number;
}
