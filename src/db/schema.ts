import { pgTable, serial, varchar, timestamp, numeric } from 'drizzle-orm/pg-core';

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

// Nova tabela para itens da planilha
export const planilhaItems = pgTable('planilha_items', {
  id: serial('id').primaryKey(),
  pdv: varchar('pdv', { length: 255 }),
  produto: varchar('produto', { length: 255 }).notNull(),
  produtos: varchar('produtos', { length: 1000 }),
  funcionario: varchar('funcionario', { length: 255 }).notNull(),
  data: timestamp('data').notNull(),
  controle: varchar('controle', { length: 255 }),
  erro: varchar('erro', { length: 500 }),
  valorDesconto: numeric('valor_desconto').notNull(),
  observacao: varchar('observacao', { length: 1000 }),
  criadoEm: timestamp('criado_em').defaultNow().notNull(),
});

export type PlanilhaItem = typeof planilhaItems.$inferSelect;
export type NewPlanilhaItem = typeof planilhaItems.$inferInsert;