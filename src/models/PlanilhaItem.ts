export interface PlanilhaItem {
  id?: number;
  pdv?: string | null;
  produto: string;
  produtos?: string | null;
  funcionario: string;
  data: string; // ISO date string
  controle?: string | null;
  erro?: string | null;
  valorDesconto: number;
  observacao?: string | null;
  criadoEm?: string;
}

export interface CreatePlanilhaItemDTO {
  pdv?: string | null;
  produto: string;
  produtos?: string | null;
  funcionario: string;
  data: string; // ISO date string expected (yyyy-mm-dd or ISO)
  controle?: string | null;
  erro?: string | null;
  valorDesconto: number;
  observacao?: string | null;
}