import { Equipment, EquipmentInput } from '../domain/equipment';

/**
 * Serviço de persistência de equipamentos.
 *
 * Neste estágio os dados são mantidos apenas em memória para fins de
 * demonstração, simulando o comportamento de uma API real.
 */

// Conjunto de equipamentos armazenados em memória
let equipments: Equipment[] = [
  {
    id: 1,
    name: 'Split 9000',
    model: 'LG',
    tag: 'HVAC-01',
    location: 'Sala 1',
    btus: 9000,
  },
  {
    id: 2,
    name: 'Split 12000',
    model: 'Samsung',
    tag: 'HVAC-02',
    location: 'Sala 2',
    btus: 12000,
  },
];

// Simula uma pequena latência nas requisições
const delay = () => new Promise((r) => setTimeout(r, 100));

/** Conjunto de operações relacionadas a equipamentos. */
const EquipmentService = {
  /** Obtém a lista de equipamentos cadastrados */
  async list(): Promise<Equipment[]> {
    await delay();
    return equipments;
  },
  /** Cadastra um novo equipamento */
  async create(data: EquipmentInput): Promise<Equipment> {
    await delay();
    const exists = equipments.some((e) => e.tag === data.tag);
    if (exists) {
      const err = new Error('TAG duplicada');
      // @ts-ignore
      err.status = 422;
      throw err;
    }
    const newEquipment: Equipment = { id: Date.now(), ...data };
    equipments.push(newEquipment);
    return newEquipment;
  },
  /** Atualiza um equipamento existente */
  async update(id: number, data: EquipmentInput): Promise<Equipment> {
    await delay();
    const idx = equipments.findIndex((e) => e.id === id);
    if (idx === -1) throw new Error('Not found');
    const exists = equipments.some((e) => e.tag === data.tag && e.id !== id);
    if (exists) {
      const err = new Error('TAG duplicada');
      // @ts-ignore
      err.status = 422;
      throw err;
    }
    equipments[idx] = { id, ...data };
    return equipments[idx];
  },
  /** Remove um equipamento pelo id */
  async remove(id: number): Promise<void> {
    await delay();
    equipments = equipments.filter((e) => e.id !== id);
  },
};

export default EquipmentService;
