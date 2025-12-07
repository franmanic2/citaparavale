import { ApiSuitorRepository } from '../infrastructure/ApiSuitorRepository';
import { Suitor } from '../domain/Suitor';

export class SuitorService {
  constructor() {
    this.repository = new ApiSuitorRepository();
  }

  async registerSuitor(data) {
    const suitor = new Suitor(data);
    await this.repository.save(suitor);
  }

  async getAllSuitors() {
    return await this.repository.getAll();
  }

  async searchSuitors(query) {
    return await this.repository.findByName(query);
  }
}
