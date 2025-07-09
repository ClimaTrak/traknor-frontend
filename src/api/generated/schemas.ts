// Arquivo gerado automaticamente via pnpm api:gen
export interface ExampleSchema {
  id: number;
}

export interface Equipment {
  id: number;
  nome: string;
  categoria: string;
  fabricante: string;
  numeroSerie: string;
  status: string;
}

export interface EquipmentInput extends Omit<Equipment, 'id'> {}

export interface WorkOrder {
  id: number;
  titulo: string;
  prioridade: 'LOW' | 'MEDIUM' | 'HIGH';
  equipamento: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED';
  dataAbertura: string;
}

export interface StatusChoice {
  label: string;
  value: 'OPEN' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED';
}
