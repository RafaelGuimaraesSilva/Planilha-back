import { db } from '../db'; // ajuste o caminho se seu export do client Drizzle estiver em outro arquivo
import { planilhaItems } from '../db/schema';
import type { NewPlanilhaItem } from '../db/schema';
import type { PlanilhaItem as ModelPlanilhaItem, CreatePlanilhaItemDTO as ModelCreateDTO } from '../models/PlanilhaItem';

export class PlanilhaRepository {
  
  async findAll(): Promise<ModelPlanilhaItem[]> {
    const result = await db.select().from(planilhaItems).orderBy(planilhaItems.id).execute();

    return result.map(r => ({
      id: r.id,
      pdv: r.pdv ?? null,
      produto: r.produto,
      produtos: r.produtos ?? null,
      funcionario: r.funcionario,
      data: (r.data as Date).toISOString(),
      controle: r.controle ?? null,
      erro: r.erro ?? null,
      valorDesconto: Number((r as any).valorDesconto),
      observacao: r.observacao ?? null,
      criadoEm: (r.criadoEm as Date).toISOString(),
    }));
  }

  async createMany(dtos: ModelCreateDTO[]): Promise<ModelPlanilhaItem[]> {
    if (!Array.isArray(dtos) || dtos.length === 0) return [];

    const values: NewPlanilhaItem[] = dtos.map(i => ({
      pdv: i.pdv ?? null,
      produto: i.produto,
      produtos: i.produtos ?? null,
      funcionario: i.funcionario,
      data: new Date(i.data),
      controle: i.controle ?? null,
      erro: i.erro ?? null,
      // Drizzle numeric/decimal maps to string in inserts/returns for some drivers — stringify to be safe
      valorDesconto: String(i.valorDesconto) as any,
      observacao: i.observacao ?? null,
    }));

    const inserted = await db.transaction(async (tx) => {
      const rows = await tx
        .insert(planilhaItems)
        .values(values)
        .returning({
          id: planilhaItems.id,
          pdv: planilhaItems.pdv,
          produto: planilhaItems.produto,
          produtos: planilhaItems.produtos,
          funcionario: planilhaItems.funcionario,
          data: planilhaItems.data,
          controle: planilhaItems.controle,
          erro: planilhaItems.erro,
          valorDesconto: planilhaItems.valorDesconto,
          observacao: planilhaItems.observacao,
          criadoEm: planilhaItems.criadoEm,
        });
      return rows;
    });

    return inserted.map(r => ({
      id: r.id,
      pdv: r.pdv ?? null,
      produto: r.produto,
      produtos: r.produtos ?? null,
      funcionario: r.funcionario,
      data: (r.data as Date).toISOString(),
      controle: r.controle ?? null,
      erro: r.erro ?? null,
      valorDesconto: Number((r as any).valorDesconto),
      observacao: r.observacao ?? null,
      criadoEm: (r.criadoEm as Date).toISOString(),
    }));
  }

  async close(): Promise<void> {
    // Atualmente não há export do client para encerrar a conexão; se futuramente exportarmos o client,
    // aqui podemos chamar client.end() ou cleanup apropriado.
    return Promise.resolve();
  }
}

export const planilhaRepository = new PlanilhaRepository();