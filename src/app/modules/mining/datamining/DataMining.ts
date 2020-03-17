import IDataMining from "./IDataMIning";
import Sorteo from "../../../models/Sorteo";
import MiningServices from "./MiningServices";
import Totalizador from "models/Totalizador";
import Estatistica from "../../../models/Estatistica";
import MiningUtils from "../../../utils/MiningUtil";

export default abstract class DataMining extends MiningServices implements IDataMining {
    
    loader: any;
    processor: any;    

    constructor({ processor, loader }: { processor: any; loader: any; }) {
        super();
        this.processor = processor;
        this.loader = loader;
    }

    getLoadedData(): object[] {
        return this.loader.getDataLoaded();
    }

    getModels(): Sorteo[] {
        return this.processor
            .extractDataToModel(this.getLoadedData())
            .getModelS();
    }

    getNumerosSorteadoPorBola(_bola: string): string[] {

        let sorteios = this.getModels();
        let numerosSorteados = [];

        Object.keys(sorteios).forEach((key) => {
            let bola = sorteios[key][_bola];
            numerosSorteados.push(bola);
        });

        return numerosSorteados;
    }

    getCalcularNumerosSorteadosPorBola(_bola: string): Totalizador[] {

        let numerosSorteadosPorBolaData = this.getNumerosSorteadoPorBola(_bola);
        let numerosSorteadosPorBola: Totalizador[] = [];
        const total = numerosSorteadosPorBolaData.length;

        this.formatarModeloInicial({ numerosSorteadosPorBolaData, numerosSorteadosPorBola });
        this.contabilizaNumerosSorteadosPorBola({ numerosSorteadosPorBolaData, numerosSorteadosPorBola });
        this.contabilizaPorcentagem({ numerosSorteadosPorBola, total });

        return numerosSorteadosPorBola;
    }
    
    getEstatisticasConcursosSorteados(): Estatistica[] {

        let sorteios = this.getModels();
        let estatisticasConcursosSorteados: Estatistica[] = [];

        Object.keys(sorteios).forEach((key) => {

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
