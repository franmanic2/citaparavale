import { LocalStorageSuitorRepository } from '../infrastructure/LocalStorageSuitorRepository';
import { Suitor } from '../domain/Suitor';

export class SuitorService {
  constructor() {
    this.repository = new LocalStorageSuitorRepository();
  }

  registerSuitor(data) {
    const suitor = new Suitor(data);
    this.repository.save(suitor);
  }

  getAllSuitors() {
    return this.repository.getAll();
  }

  searchSuitors(query) {
    return this.repository.findByName(query);
  }
}
