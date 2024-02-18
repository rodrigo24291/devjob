export interface CategoriaResponse {
    message: string;
    statuscode: number;
    data: CategoriaData[];
    error: boolean;
  }
  
  export interface CategoriaData {
    id: number;
    categoria: string;
    created_at: string;
    updated_at: string;
  }
  