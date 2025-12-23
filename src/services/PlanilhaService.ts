import { planilhaRepository } from '../repositories/PlanilhaRepository';
import type { CreatePlanilhaItemDTO, PlanilhaItem } from '../models/PlanilhaItem';

export class PlanilhaService {
  async listAll(): Promise<PlanilhaItem[]> {
    return await planilhaRepository.findAll();
  }

  async addMany(items: CreatePlanilhaItemDTO[]): Promise<PlanilhaItem[]> {
    if (!Array.isArray(items)) throw new Error('items deve ser um array');

    // Validações básicas
    const validated = items.map((i, idx) => {
      if (!i.produto || !i.funcionario) {
        throw new Error(`Item ${idx}: 'produto' e 'funcionario' são obrigatórios`);
      }
      if (typeof i.valorDesconto !== 'number' || Number.isNaN(i.valorDesconto)) {
        throw new Error(`Item ${idx}: 'valorDesconto' deve ser um número`);
      }
      // Data precisa ser uma string parseável
      const date = new Date(i.data);
      if (isNaN(date.getTime())) {
        throw new Error(`Item ${idx}: 'data' inválida`);
      }
      return {
        ...i,
        data: date.toISOString(),
      } as CreatePlanilhaItemDTO;
    });

    const created = await planilhaRepository.createMany(validated);
    return created;
  }
}

export default new PlanilhaService();