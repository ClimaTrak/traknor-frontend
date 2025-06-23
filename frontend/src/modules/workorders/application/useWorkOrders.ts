import type { WorkOrderStatus } from '../domain/workorder';
import {
  useGetApiWorkOrders,
  useGetApiWorkOrdersById,
  useGetApiWorkOrdersStatusChoicesById,
  usePatchApiWorkOrdersStatusById,
} from '@/api/generated/hooks/workOrders';

export interface WorkOrderQuery {
  page: number;
  search?: string;
  status?: string;
  priority?: string;
}
export const useWorkOrders = (params: WorkOrderQuery) =>
  useGetApiWorkOrders(params);

export const useWorkOrder = (id: number) => useGetApiWorkOrdersById(id);

export const useStatusChoices = (id: number) =>
  useGetApiWorkOrdersStatusChoicesById(id);

export const useTransitionStatus = (id: number) =>
  usePatchApiWorkOrdersStatusById(id);
