-- Migration: 0002_add_fields_planilha_items.sql
-- Adiciona campos do formulário: pdv, produtos, data, controle, erro

ALTER TABLE planilha_items
  ADD COLUMN IF NOT EXISTS pdv varchar(255),
  ADD COLUMN IF NOT EXISTS produtos varchar(1000),
  ADD COLUMN IF NOT EXISTS data timestamp DEFAULT now() NOT NULL,
  ADD COLUMN IF NOT EXISTS controle varchar(255),
  ADD COLUMN IF NOT EXISTS erro varchar(500);
