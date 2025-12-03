import fs from 'fs/promises';
import path from 'path';
import { PlanilhaItem, CreatePlanilhaItemDTO } from '../models/PlanilhaItem';

const DATA_FILE = path.resolve(__dirname, '../../data/planilha.json');

export class PlanilhaRepository {
  private async readAll(): Promise<PlanilhaItem[]> {
    try {
      const raw = await fs.readFile(DATA_FILE, 'utf8');
      return JSON.parse(raw) as PlanilhaItem[];
    } catch (err) {
      if ((err as any).code === 'ENOENT') return [];
      throw err;
    }
  }

  private async writeAll(items: PlanilhaItem[]) {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), 'utf8');
  }

  async findAll(): Promise<PlanilhaItem[]> {
    return this.readAll();
  }

  async createMany(items: CreatePlanilhaItemDTO[]): Promise<PlanilhaItem[]> {
    const existing = await this.readAll();
    let nextId = existing.length ? Math.max(...existing.map(i => i.id || 0)) + 1 : 1;
    const now = new Date().toISOString();
    const created = items.map(dto => ({ id: nextId++, criadoEm: now, ...dto }));
    const all = existing.concat(created);
    await this.writeAll(all);
    return created;
  }
}