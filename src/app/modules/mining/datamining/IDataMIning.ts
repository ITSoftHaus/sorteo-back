import Sorteo from "models/Sorteo";
import Totalizador from "models/Totalizador";
import Estatistica from "models/Estatistica";
export default interface IDataMining {
    
    processor: any;
    loader: any;    

    getModels(): Sorteo[];
    getLoadedData(): object[];
    getNumerosSorteadoPorBola(_bola: string) : string[];
    getCalcularNumerosSorteadosPorBola(_bola: string): Totalizador[];
    getEstatisticasConcursosSorteados(): Estatistica[];    
}
