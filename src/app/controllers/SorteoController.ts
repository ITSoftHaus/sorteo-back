import App from '../App';
import IDataMining from '../modules/mining/datamining/IDataMIning';
import IDataLouder from '../modules/dataloader/loaders/IDataLoader';
import LotofacilDataProcessor from '../modules/mining/dataprocessing/LotofacilDataProcessor';
import LotofacilController from './LotofacilController';
import LotoFacil from '../models/LotoFacil';

export default class SorteoController {

    private lotofacilDataLoader: IDataLouder;
    private lotofacilDataProcessor: LotofacilDataProcessor;
    private lotofacilDataMining: IDataMining;
    private lotofacilController: LotofacilController;
    private lotoFacilModels: LotoFacil[];

    constructor(private app: App) {
        this.lotofacilDataLoader = this.app.loaders.lotofacil;
        this.lotofacilDataProcessor = this.app.processors.lotofacilProcessor;
        this.lotofacilDataMining = this.app.minings.lotofacil;
        this.lotofacilController = new LotofacilController();
    }

    getLoadedDataFromLotofacil(): object[] {
        return this.lotofacilDataLoader.getDataLoaded();
    }

    getLoadedFileBufferFromLotofacil(): Buffer {
        return this.lotofacilDataLoader.getFileBufferLoaded();
    }

    getLotofacilModels(): object[] {
        this.lotoFacilModels = this.lotofacilDataProcessor
            .extractDataToModel(this.getLoadedDataFromLotofacil())
            .getModelS();
        Object.keys(this.lotoFacilModels).forEach((key) => {
            this.saveModelsToDB({ lotofacilModels: this.lotoFacilModels, key });
        });
        return this.lotoFacilModels;
    }

    get getLotofacilDataMining(): IDataMining {
        return this.lotofacilDataMining;
    }

    getZipFileFromUrl() {
        this.lotofacilDataLoader.loader.getZipFileFromUrl(process.env.LOT_FAC_URL_ZIP_FILE);
    }

    getLotofacilModel() {
        return this.lotofacilController.listarTodos;
    }

    private saveModelsToDB({ lotofacilModels, key }:
                           { lotofacilModels: LotoFacil[]; key: string; }) {
        this.lotofacilController.novo(lotofacilModels[key]);
    }
}
