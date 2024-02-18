export interface AuthResponse {
  message: string;
  statuscode: number;
  data:{
    user:Users,
    token:string
  } 
  error: boolean;
}

export interface Users {
  name: string;
  email: string;
  rol: string;
  verification_token: string;
  updated_at: string;
  created_at: string;
  id: number;
};