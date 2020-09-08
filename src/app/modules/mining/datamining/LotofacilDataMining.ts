import DataMining from './DataMining';
import DataProcessor from '../dataprocessing/DataProcessor';
import IDataLouder from 'modules/dataloader/loaders/IDataLoader';

export default class LotofacilDataMining extends DataMining {
  constructor(loader: IDataLouder, processor: DataProcessor) {
    super({ processor, loader });
  }
}
