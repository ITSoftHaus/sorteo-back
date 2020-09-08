import IDataMining from './IDataMIning';
import Sorteo from '../../../models/Sorteo';
import MiningServices from './MiningServices';
import Totalizador from '../../../models/Totalizador';
import Estatistica from '../../../models/Estatistica';
import MiningUtils from '../../../utils/MiningUtil';
import ArrayUtils from '../../../utils/ArrayUtils';

export default abstract class DataMining extends MiningServices
  implements IDataMining {
  loader: any;
  processor: any;

  constructor({ processor, loader }: { processor: any; loader: any }) {
    super();
    this.processor = processor;
    this.loader = loader;
  }

  getLoadedData(): object[] {
    return this.loader.getDataLoaded();
  }

  getModels(): Sorteo[] {
    return this.processor.extractDataToModel(this.getLoadedData()).getModelS();
  }

  getNumerosSorteadoPorBola(_bola: string): string[] {
    let sorteios = this.getModels();
    let numerosSorteados = [];

    Object.keys(sorteios).forEach(key => {
      let bola = sorteios[key][_bola];
      numerosSorteados.push(bola);
    });

    return numerosSorteados;
  }

  getCalcularNumerosSorteadosPorBola(_bola: string): Totalizador[] {
    let numerosSorteadosPorBolaData = this.getNumerosSorteadoPorBola(_bola);
    let numerosSorteadosPorBola: Totalizador[] = [];
    const total = numerosSorteadosPorBolaData.length;

    this.formatarModeloInicial({
      numerosSorteadosPorBolaData,
      numerosSorteadosPorBola
    });
    this.contabilizaNumerosSorteadosPorBola({
      numerosSorteadosPorBolaData,
      numerosSorteadosPorBola
    });
    this.contabilizaPorcentagem({ numerosSorteadosPorBola, total });

    return numerosSorteadosPorBola;
  }

  getTotalNumerosSorteadosTodosSorteios(): Totalizador[] {
    let numerosSorteadosPorBola: Totalizador[] = [];
    let numerosSorteadosMap = new Map();
    let sorteios = this.getModels();
    const total = sorteios.length;

    Object.keys(sorteios).forEach(key => {
      for (let index = 1; index < 16; index++) {
        const bola = 'bola' + index;
        let numero = parseInt(sorteios[key][bola]);
        if (numerosSorteadosMap.size > 0) {
          let valor = numerosSorteadosMap.get(numero);
          if (valor === undefined) {
            numerosSorteadosMap.set(numero, 1);
          } else {
            valor = parseInt(valor);
            numerosSorteadosMap.set(numero, ++valor);
          }
        } else {
          numerosSorteadosMap.set(numero, 1);
        }
      }
    });

    numerosSorteadosMap.forEach((key, value) => {
      let numeroSorteado = value;
      let valorNumeroSorteado = key;
      let numeroSorteadoModel = new Totalizador();

      numeroSorteadoModel.setNumero(parseInt(numeroSorteado));
      numeroSorteadoModel.setTotal(valorNumeroSorteado);
      numeroSorteadoModel.setPorcentagem(0);
      ArrayUtils.pushToArrayTotalizador({
        arr: numerosSorteadosPorBola,
        obj: numeroSorteadoModel
      });
    });

    this.contabilizaPorcentagem({ numerosSorteadosPorBola, total });

    return numerosSorteadosPorBola.sort((a, b) =>
      a.getTotal() < b.getTotal() ? 1 : -1
    );
  }

  getEstatisticasConcursosSorteados(): Estatistica[] {
    let sorteios = this.getModels();
    let estatisticasConcursosSorteados: Estatistica[] = [];

    Object.keys(sorteios).forEach(key => {
      let sorteio = sorteios[key];
      let estatistica: Estatistica;
      let numeros: number[];

      estatistica = new Estatistica();
      numeros = this.carregarNumerosSorteados(sorteio);

      estatistica.setConcurso(sorteio.concurso);
      estatistica.setNumerosSorteados(numeros);
      estatistica.setMedia(MiningUtils.media(numeros));
      estatistica.setMediana(MiningUtils.mediana(numeros));
      estatistica.setModa(0);
      estatistica.setMaximo(MiningUtils.maximo(numeros));
      estatistica.setMinimo(MiningUtils.minimo(numeros));
      estatistica.setDesvioPadrao(MiningUtils.desvioPadrao(numeros));
      estatistica.setVariancia(MiningUtils.variancia(numeros));

      estatisticasConcursosSorteados.push(estatistica);
    });

    return estatisticasConcursosSorteados;
  }
}
