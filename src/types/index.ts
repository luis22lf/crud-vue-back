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