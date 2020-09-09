import DataProvider from './DataProvider';
import LotoFacilDataProvider from './LotoFacilDataProvider';
import UserDataProvider from './UserDataProvider';

export default class AppDataProviders {
  /**
   * Instâncias de Provedores de Dados
   */
  private stores: DataProvider[];

  constructor() {
    this.stores = this.getProviders().map(provider => provider);
  }

  /**
   * Retorna o provedor de dados de lotofacil
   */
  get lotofacil(): LotoFacilDataProvider {
    return this.getProviderInstance(LotoFacilDataProvider);
  }

  /**
   * Retorna o provedor de dados do usuário
   */
  get user(): UserDataProvider {
    return this.getProviderInstance(UserDataProvider);
  }

  /**
   * Retorna a instância do provedor especificado
   * @param typeProvider
   */
  private getProviderInstance(typeProvider: any): any | null {
    let items = this.stores.filter(provider => {
      if (provider instanceof typeProvider) {
        return provider;
      }
    });
    return items.length > 0 ? items[0] : null;
  }

  /**
   * Provedores para inicialização
   */
  private getProviders(): DataProvider[] {
    return [new UserDataProvider(), new LotoFacilDataProvider()];
  }
}
