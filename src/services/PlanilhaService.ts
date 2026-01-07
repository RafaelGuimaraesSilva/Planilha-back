import { planilhaRepository } from '../repositories/PlanilhaRepository';
import type { CreatePlanilhaItemDTO, PlanilhaItem } from '../models/PlanilhaItem';

export class PlanilhaService {
  async listAll(): Promise<PlanilhaItem[]> {
    return await planilhaRepository.findAll();
  }

  async addOne(item: CreatePlanilhaItemDTO): Promise<PlanilhaItem> {
    if (!item.produto || !item.funcionario) {
      throw new Error("'produto' e 'funcionario' são obrigatórios");
    }
    if (typeof item.valorDesconto !== 'number' || Number.isNaN(item.valorDesconto)) {
      throw new Error("'valorDesconto' deve ser um número");
    }
    // Data precisa ser uma string parseável
    const date = new Date(item.data);
    if (isNaN(date.getTime())) {
      throw new Error("'data' inválida");
    }

    const validated: CreatePlanilhaItemDTO = {
      ...item,
      data: date.toISOString(),
    };

    const created = await planilhaRepository.create(validated);
    return created;
  }
}

export default new PlanilhaService();