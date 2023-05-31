
export interface Product {
  id?: number;
  created_at: Date;
  updated_at: Date;
  name: string;
  description: string;
  state: string;
  photo?: string[];
  price: string;
  categoryId: number;
  active: boolean;
  userId: number;
}
