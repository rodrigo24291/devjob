export interface VacanteResponse {
    message: string;
    statuscode: number;
    data: Vacante[] | [] ;
    error: boolean;
  }
  interface Salario {
    id: number;
    salario: string;
    created_at: string;
    updated_at: string;
  }

  interface Categoria {
    id: number;
    categoria: string;
    created_at: string;
    updated_at: string;
  }  
  
  export interface Vacante {
    title: string;
    salario_id: number;
    categoria_id: number;
    empresa: string;
    description: string;
    date: string;
    image: string;
    user_id: number;
    updated_at: string;
    created_at: string;
    id: number;
    salario: Salario;
    categoria: Categoria;

  }
  