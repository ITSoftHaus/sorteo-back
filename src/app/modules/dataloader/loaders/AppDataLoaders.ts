import DataLoader from './DataLoader';
import LotofacilDataLoader from "./LotofacilDataLoader";
import IDataLouder from './IDataLoader';

export default class AppDataLoaders {

    private loaders: DataLoader[];

    constructor() {
        this.loaders = this.getLoaders()
            .map(loader => {
                return new loader();
            });
    }

    /**
     * Retorna o loader de dados da lotofacil
     */
    get lotofacil(): IDataLouder {
        return this.getLoaderInstance(LotofacilDataLoader);
    }

    /**
     * Retorna a instância do loader especificado     *
     * @param typeProvider
     */
    private getLoaderInstance(typeLoader: any): any | null {
        let items = this.loaders.filter((loader) => {
            if (loader instanceof typeLoader) {
                return loader;
            }
        });
        return items.length > 0 ? items[0] : null;
    }

    /**
     * Loaders para inicialização
     */
    private getLoaders(): any[] {
        return [
            LotofacilDataLoader
        ];
    }
}
