export interface PlanilhaItem {
  id?: number;
  produto: string;
  funcionario: string;
  valorDesconto: number;
  observacao?: string;
  criadoEm?: string;
}

export type CreatePlanilhaItemDTO = Omit<PlanilhaItem, 'id' | 'criadoEm'>;
export type CreatePlanilhaItemsDTO = CreatePlanilhaItemDTO[];