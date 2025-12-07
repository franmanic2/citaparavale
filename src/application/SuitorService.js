// import { ApiSuitorRepository } from '../infrastructure/ApiSuitorRepository';
import { FirebaseSuitorRepository } from '../infrastructure/FirebaseSuitorRepository';
// import { LocalStorageSuitorRepository } from '../infrastructure/LocalStorageSuitorRepository';
import { Suitor } from '../domain/Suitor';

export class SuitorService {
  constructor() {
    // CAMBIAR AQUI EL REPOSITORIO QUE QUIERAS USAR
    // this.repository = new ApiSuitorRepository(); // Para json-server local
    // this.repository = new LocalStorageSuitorRepository(); // Para solo local browser
    this.repository = new FirebaseSuitorRepository(); // Para Producción (Firebase)
  }

  async registerSuitor(data) {
    const suitor = new Suitor(data);
    await this.repository.save(suitor);
  }

  async getAllSuitors() {
    return await this.repository.getAll(); // Ensure async is handled even for sync repos
  }

  async searchSuitors(query) {
    return await this.repository.findByName(query);
  }
}
