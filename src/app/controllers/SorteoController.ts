import App from '../App';
import IDataMining from '../modules/mining/datamining/IDataMIning';
import IDataLouder from 'modules/dataloader/loaders/IDataLoader';
import LotofacilDataProcessor from 'modules/mining/dataprocessing/LotofacilDataProcessor';

export default class SorteoController {

    private lotofacilDataLoader: IDataLouder;
    private lotofacilDataProcessor: LotofacilDataProcessor;
    private lotofacilDataMining: IDataMining;

    constructor(private app: App) {
        this.lotofacilDataLoader = this.app.loaders.lotofacil;
        this.lotofacilDataProcessor = this.app.processors.lotofacilProcessor;
        this.lotofacilDataMining = this.app.minings.lotofacil;
    }

    getLoadedDataFromLotofacil(): object[] {
        return this.lotofacilDataLoader.getDataLoaded();
    }

    getLoadedFileBufferFromLotofacil(): Buffer {
        return this.lotofacilDataLoader.getFileBufferLoaded();
    }

    getLotofacilModels(): object[] {
        return this.lotofacilDataProcessor
            .extractDataToModel(this.getLoadedDataFromLotofacil())
            .getModelS();
    }

    get getLotofacilDataMining(): IDataMining {        
        return this.lotofacilDataMining;
    }

    getZipFileFromUrl() {
        this.lotofacilDataLoader.loader.getZipFileFromUrl(process.env.LOT_FAC_URL_ZIP_FILE);
    }

}