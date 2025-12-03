import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';

// Tabela de Clientes
export const clientes = pgTable('clientes', {
  id: serial('id').primaryKey(),
  nome: varchar('nome', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  telefone: varchar('telefone', { length: 20 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Tipos TypeScript inferidos do schema
export type Cliente = typeof clientes.$inferSelect;
export type NewCliente = typeof clientes.$inferInsert;

export const produtos = pgTable('produtos', {
  id: serial('id').primaryKey(),
  nome: varchar('nome', { length: 255 }).notNull(),
    descricao: varchar('descricao', { length: 500 }),
    preco: varchar('preco', { length: 50 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Produto = typeof produtos.$inferSelect;
export type NewProduto = typeof produtos.$inferInsert;