// Auto-generated via pnpm api:gen
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
