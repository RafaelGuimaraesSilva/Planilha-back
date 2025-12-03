// Importar tipos do schema do Drizzle
import { Cliente as ClienteDB, NewCliente } from '../db/schema';

// Re-exportar os tipos do Drizzle
export type Cliente = ClienteDB;

// DTOs para criação e atualização
export interface CreateClienteDTO {
  nome: string;
  email: string;
  telefone?: string;
}

export interface UpdateClienteDTO {
  nome?: string;
  email?: string;
  telefone?: string;
}