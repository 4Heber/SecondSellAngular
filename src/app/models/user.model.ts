// MODELO USUARIO, HAY QUE PONER LOS CAMPOS NECESARIOS

export interface User {
  id?: number;
  name: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  photo?: string;
  token?: string;
  coins?: number;
  created_at: Date;
}
