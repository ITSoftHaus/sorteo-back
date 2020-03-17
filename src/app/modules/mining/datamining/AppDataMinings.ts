import LotofacilDataMining from "./LotofacilDataMining";
import IDataMining from "./IDataMIning";
import App from "App";
export default class AppDataMinings {

    private dataMinings: IDataMining[];

    constructor(private app: App) {
        this.dataMinings = this.getDataMinings(this.app)
            .map(mining => {
                return mining;
            });
    }

    /**
     * Retorna o loader de dados da lotofacil
     */
    get lotofacil(): IDataMining {
        return this.getLoaderInstance(LotofacilDataMining);
    }

    /**
     * Retorna a instância do mining especificado     *
     * @param typeProvider
     */
    private getLoaderInstance(typeLoader: any): IDataMining | null {
        let items = this.dataMinings.filter((loader) => {
            if (loader instanceof typeLoader) {
                return loader;
            }
        });
        return items.length > 0 ? items[0] : null;
    }

    /**
     * Minings para inicialização
     */
    private getDataMinings(app: App): IDataMining[] {
        return [
            new LotofacilDataMining(app.loaders.lotofacil, app.processors.lotofacilProcessor)
        ];
    }
}