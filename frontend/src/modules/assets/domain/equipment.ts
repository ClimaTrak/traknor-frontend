export interface Equipment {
  id: number;
  name: string;
  model: string;
  tag: string;
  location: string;
  btus: number;
}

export type EquipmentInput = Omit<Equipment, 'id'>;
