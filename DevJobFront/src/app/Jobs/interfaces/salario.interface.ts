export interface SalaryResponse {
    message: string;
    statuscode: number;
    data: SalaryData[];
    error: boolean;
  }
  
 export interface SalaryData {
    id: number;
    salario: string;
    created_at: string;
    updated_at: string;
  }
  