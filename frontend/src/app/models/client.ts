export interface Client {
  id?: number;
  name: string;
  cpf: string;
  income: number;
  birthDate?: string;
  children?: number;
}