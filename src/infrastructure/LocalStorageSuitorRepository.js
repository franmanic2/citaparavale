import { Suitor } from '../domain/Suitor';

const STORAGE_KEY = 'suitors_registry';

export class LocalStorageSuitorRepository {
  save(suitor) {
    const suitors = this.getAll();
    suitors.push(suitor);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(suitors));
  }

  getAll() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    try {
      return JSON.parse(data).map(item => new Suitor(item));
    } catch (e) {
      console.error("Error parsing data", e);
      return [];
    }
  }

  findByName(name) {
    if (!name) return [];
    const suitors = this.getAll();
    return suitors.filter(s => 
      s.name.toLowerCase().includes(name.toLowerCase())
    );
  }
}
