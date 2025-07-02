/** Possíveis status de uma ordem de serviço */
export type WorkOrderStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED';

/** Níveis de prioridade */
export type WorkOrderPriority = 'LOW' | 'MEDIUM' | 'HIGH';

/**
 * Estrutura básica de uma ordem de serviço.
 */
export interface WorkOrder {
  /** Identificador da OS */
  id: number;
  /** Título ou descrição resumida */
  titulo: string;
  /** Prioridade definida */
  prioridade: WorkOrderPriority;
  /** Equipamento relacionado */
  equipamento: string;
  /** Status atual */
  status: WorkOrderStatus;
  /** Data de abertura no formato ISO */
  dataAbertura: string;
}

/** Opções de transição de status retornadas pela API */
export interface StatusChoice {
  label: string;
  value: WorkOrderStatus;
}
