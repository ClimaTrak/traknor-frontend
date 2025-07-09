import type { WorkOrderStatus } from '../domain/workorder';
import {
  useGetApiWorkOrders,
  useGetApiWorkOrdersById,
  useGetApiWorkOrdersStatusChoicesById,
  usePatchApiWorkOrdersStatusById,
} from '@/api/generated/hooks/workOrders';

/**
 * Hooks utilitários para consulta e manipulação de ordens de serviço.
 */

/** Parâmetros aceitos ao listar ordens de serviço. */
export interface WorkOrderQuery {
  /** Página a ser carregada */
  page: number;
  /** Texto para busca */
  search?: string;
  /** Filtro de status */
  status?: string;
  /** Filtro de prioridade */
  priority?: string;
}
/** Consulta lista de ordens de serviço com base nos filtros */
export const useWorkOrders = (params: WorkOrderQuery) =>
  useGetApiWorkOrders(params);

/** Obtém uma OS específica pelo id */
export const useWorkOrder = (id: number) => useGetApiWorkOrdersById(id);

/** Lista de possíveis transições de status para uma OS */
export const useStatusChoices = (id: number) =>
  useGetApiWorkOrdersStatusChoicesById(id);

/** Solicita mudança de status da OS */
export const useTransitionStatus = (id: number) =>
  usePatchApiWorkOrdersStatusById(id);
