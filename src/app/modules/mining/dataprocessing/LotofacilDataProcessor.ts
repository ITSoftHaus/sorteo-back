import Lotofacil from '../../../models/LotoFacil';
import DataProcessor from './DataProcessor';

export default class LotofacilDataProcessor extends DataProcessor {
  private lotoFacilModels: Lotofacil[];

  public extractDataToModel(dataset: object[]): LotofacilDataProcessor {
    if (dataset.length > 0) {
      this.lotoFacilModels = [];
      Object.keys(dataset).forEach(key => {
        let model = this.setLotofacilModel(dataset, key);
        this.lotoFacilModels.push(model);
      });
    }
    return this;
  }

  public getModelS(): Lotofacil[] {
    return this.lotoFacilModels;
  }

  private setLotofacilModel(dataset: object[], key: string) {
    let model = new Lotofacil();

    model.concurso = dataset[key].Concurso;
    model.dataSorteio = dataset[key].DataSorteio;
    model.bola1 = dataset[key].Bola1;
    model.bola2 = dataset[key].Bola2;
    model.bola3 = dataset[key].Bola3;
    model.bola4 = dataset[key].Bola4;
    model.bola5 = dataset[key].Bola5;
    model.bola6 = dataset[key].Bola6;
    model.bola7 = dataset[key].Bola7;
    model.bola8 = dataset[key].Bola8;
    model.bola9 = dataset[key].Bola9;
    model.bola10 = dataset[key].Bola10;
    model.bola11 = dataset[key].Bola11;
    model.bola12 = dataset[key].Bola12;
    model.bola13 = dataset[key].Bola13;
    model.bola14 = dataset[key].Bola14;
    model.bola15 = dataset[key].Bola15;
    model.sequence = this.setSequence(model);

    return model;
  }

  private setSequence(model: Lotofacil): string {
    let sequenceRoot = '0000000000000000000000000';
    let sequenceSplited = sequenceRoot.split('');
    let sequence = '';

    Object.keys(sequenceSplited).forEach((key, index) => {
      let numseek = index + 1;

      if (parseInt(model.bola1, 10) == numseek) sequenceSplited[key] = 1;
      if (parseInt(model.bola2, 10) == numseek) sequenceSplited[key] = 1;
      if (parseInt(model.bola3, 10) == numseek) sequenceSplited[key] = 1;
      if (parseInt(model.bola4, 10) == numseek) sequenceSplited[key] = 1;
      if (parseInt(model.bola5, 10) == numseek) sequenceSplited[key] = 1;
      if (parseInt(model.bola6, 10) == numseek) sequenceSplited[key] = 1;
      if (parseInt(model.bola7, 10) == numseek) sequenceSplited[key] = 1;
      if (parseInt(model.bola8, 10) == numseek) sequenceSplited[key] = 1;
      if (parseInt(model.bola9, 10) == numseek) sequenceSplited[key] = 1;
      if (parseInt(model.bola10, 10) == numseek) sequenceSplited[key] = 1;
      if (parseInt(model.bola11, 10) == numseek) sequenceSplited[key] = 1;
      if (parseInt(model.bola12, 10) == numseek) sequenceSplited[key] = 1;
      if (parseInt(model.bola13, 10) == numseek) sequenceSplited[key] = 1;
      if (parseInt(model.bola14, 10) == numseek) sequenceSplited[key] = 1;
      if (parseInt(model.bola15, 10) == numseek) sequenceSplited[key] = 1;

      sequence = sequenceSplited.toString().replace(/,/g, '');
    });

    return sequence;
  }
}
