export interface Kpi {
  label: string;
  value: number | string;
  statusColor: string;
}

export interface OrdersEvolutionPoint {
  date: string;
  value: number;
}

export interface AssetStatusData {
  name: string;
  value: number;
}

export interface DashboardStats {
  kpis: Kpi[];
  ordersEvolution: OrdersEvolutionPoint[];
  assetStatus: AssetStatusData[];
}

const DashboardService = {
  async getStats(): Promise<DashboardStats> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      kpis: [
        { label: 'OS Abertas', value: 8, statusColor: 'blue' },
        { label: 'OS Atrasadas', value: 2, statusColor: 'orange' },
        { label: 'OS Críticas', value: 1, statusColor: 'red' },
        { label: 'MTTR', value: '5h', statusColor: 'blue' },
        { label: 'MTBF', value: '100h', statusColor: 'blue' },
      ],
      ordersEvolution: [
        { date: 'Jan', value: 3 },
        { date: 'Fev', value: 4 },
        { date: 'Mar', value: 2 },
        { date: 'Abr', value: 5 },
      ],
      assetStatus: [
        { name: 'Operacional', value: 10 },
        { name: 'Manutenção', value: 2 },
        { name: 'Parado', value: 1 },
      ],
    };
  },
};

export default DashboardService;
