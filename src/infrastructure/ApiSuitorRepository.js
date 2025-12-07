import { Suitor } from '../domain/Suitor';

const API_URL = 'http://localhost:3000/suitors';

export class ApiSuitorRepository {
  async save(suitor) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(suitor),
      });
      if (!response.ok) throw new Error('Failed to save suitor');
    } catch (e) {
      console.error("Error saving suitor:", e);
      throw e;
    }
  }

  async getAll() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch suitors');
      const data = await response.json();
      return data.map(item => new Suitor(item));
    } catch (e) {
      console.error("Error fetching suitors:", e);
      return [];
    }
  }

  async findByName(name) {
    if (!name) return [];
    try {
      // json-server supports filter with ?name_like=...
      // but to match our previous logic inclusive of partials:
      const response = await fetch(`${API_URL}?q=${name}`); 
      if (!response.ok) throw new Error('Failed to search suitors');
      const data = await response.json();
      return data.map(item => new Suitor(item));
    } catch (e) {
      console.error("Error searching suitors:", e);
      return [];
    }
  }
}
