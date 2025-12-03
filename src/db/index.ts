import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import dotenv from 'dotenv';
import * as schema from './schema';

dotenv.config();

// Criar conexão com o PostgreSQL
const connectionString = process.env.DATABASE_URL!;

// Cliente para queries
const client = postgres(connectionString, {
  ssl: 'require',
  max: 20,
});

// Instância do Drizzle
export const db = drizzle(client, { schema });

// Função para testar conexão
export const testConnection = async () => {
  try {
    await client`SELECT 1`;
    console.log('✅ Drizzle conectado ao PostgreSQL (Neon)');
    return true;
  } catch (error) {
    console.error('❌ Erro ao conectar com Drizzle:', error);
    return false;
  }
};

export default db;