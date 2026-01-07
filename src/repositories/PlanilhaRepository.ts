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

  async create(item: ModelCreateDTO): Promise<ModelPlanilhaItem> {
    const insert: NewPlanilhaItem = {
      pdv: item.pdv ?? null,
      produto: item.produto,
      produtos: item.produtos ?? null,
      funcionario: item.funcionario,
      data: new Date(item.data),
      controle: item.controle ?? null,
      erro: item.erro ?? null,
      valorDesconto: String(item.valorDesconto),
      observacao: item.observacao ?? null,
    };

    const [inserted] = await db.insert(planilhaItems).values(insert).returning();

    return {
      id: inserted.id,
      pdv: inserted.pdv ?? null,
      produto: inserted.produto,
      produtos: inserted.produtos ?? null,
      funcionario: inserted.funcionario,
      data: (inserted.data as Date).toISOString(),
      controle: inserted.controle ?? null,
      erro: inserted.erro ?? null,
      valorDesconto: Number((inserted as any).valorDesconto),
      observacao: inserted.observacao ?? null,
      criadoEm: (inserted.criadoEm as Date).toISOString(),
    };
  }

  async close(): Promise<void> {
   
    return Promise.resolve();
  }
}

export const planilhaRepository = new PlanilhaRepository();