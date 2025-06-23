export type WorkOrderStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED';
export type WorkOrderPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface WorkOrder {
  id: number;
  titulo: string;
  prioridade: WorkOrderPriority;
  equipamento: string;
  status: WorkOrderStatus;
  dataAbertura: string;
}

export interface StatusChoice {
  label: string;
  value: WorkOrderStatus;
}
