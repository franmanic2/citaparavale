import { Suitor } from '../domain/Suitor';

const STORAGE_KEY = 'suitors_registry';

export class LocalStorageSuitorRepository {
  async save(suitor) {
    // Simulate async for interface consistency
    return new Promise(resolve => {
      const suitors = this.getAllSync();
      suitors.push(suitor);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(suitors));
      resolve();
    });
  }

  getAllSync() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    try {
      return JSON.parse(data).map(item => new Suitor(item));
    } catch (e) {
      console.error("Error parsing data", e);
      return [];
    }
  }

  async getAll() {
    return Promise.resolve(this.getAllSync());
  }

  async findByName(name) {
    if (!name) return [];
    const suitors = this.getAllSync();
    return Promise.resolve(suitors.filter(s => 
      s.name.toLowerCase().includes(name.toLowerCase())
    ));
  }
}
