/**
 * Representa um equipamento cadastrado no sistema.
 */
export interface Equipment {
  /** Identificador único */
  id: number;
  /** Nome do equipamento */
  name: string;
  /** Modelo ou especificação */
  model: string;
  /** TAG de identificação */
  tag: string;
  /** Localização física */
  location: string;
  /** Capacidade térmica em BTUs */
  btus: number;
}

/**
 * Estrutura utilizada para criação de equipamentos.
 * O campo `id` é omitido pois será gerado automaticamente.
 */
export type EquipmentInput = Omit<Equipment, 'id'>;
