export type Equipamento = {
  id?: number;
  nome: string;
  situacao: string;
};

export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
};

declare global {
  namespace Express {
  export interface Request {
      id_usuario?: string; // Agora é string
    }
  }
}