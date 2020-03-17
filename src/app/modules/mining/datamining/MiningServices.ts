import ArrayUtils from "../../../utils/ArrayUtils";
import MiningUtils from "../../../utils/MiningUtil";
import Totalizador from "../../../models/Totalizador";
import Sorteo from "../../../models/Sorteo";
export default class MiningServices {

    totalizadorModel: Totalizador;

    protected contabilizaPorcentagem({ numerosSorteadosPorBola, total }:
        {
            numerosSorteadosPorBola: Totalizador[]; total: number;
        }) {

        Object.keys(numerosSorteadosPorBola).forEach((index) => {
            this.totalizadorModel = numerosSorteadosPorBola[index];
            let valor = this.totalizadorModel.getTotal();
            let porcentagem = MiningUtils.calculaPorcentagem({ valor, total });
            this.totalizadorModel.setPorcentagem(porcentagem);
        });
    }

    protected contabilizaNumerosSorteadosPorBola({ numerosSorteadosPorBolaData, numerosSorteadosPorBola }:
        { numerosSorteadosPorBolaData: string[]; numerosSorteadosPorBola: Totalizador[]; }) {
        this.contabilizarNumerosSorteadosPorBola({ numerosSorteadosPorBolaData, numerosSorteadosPorBola });
    }

    protected formatarModeloInicial({ numerosSorteadosPorBolaData, numerosSorteadosPorBola }:
        { numerosSorteadosPorBolaData: string[]; numerosSorteadosPorBola: Totalizador[]; }) {

        Object.keys(numerosSorteadosPorBolaData).forEach((key) => {

            let numeroSorteado = numerosSorteadosPorBolaData[key];
            let numeroSorteadoModel = new Totalizador();

            numeroSorteadoModel.setNumero(parseInt(numeroSorteado));
            numeroSorteadoModel.setTotal(0);
            numeroSorteadoModel.setPorcentagem(0);
            ArrayUtils.pushToArrayTotalizador({ arr: numerosSorteadosPorBola, obj: numeroSorteadoModel });
        });

        numerosSorteadosPorBola.sort((a, b) => (a.getNumero() > b.getNumero()) ? 1 : -1);
    }

    protected contabilizarNumerosSorteadosPorBola({ numerosSorteadosPorBolaData, numerosSorteadosPorBola }:
        { numerosSorteadosPorBolaData: string[]; numerosSorteadosPorBola: Totalizador[]; }) {

        Object.keys(numerosSorteadosPorBolaData).forEach((key) => {

            let numeroSorteado = parseInt(numerosSorteadosPorBolaData[key]);

            const index = numerosSorteadosPorBola.findIndex((e: { getNumero(): number; }) => {
                return e.getNumero() === numeroSorteado;
            });

            this.totalizadorModel = numerosSorteadosPorBola[index];
            let total = this.totalizadorModel.getTotal();
            this.totalizadorModel.setTotal(++total);
        });
    }

    protected carregarNumerosSorteados(sorteio: Sorteo): number[] {

        let numeros: number[] = [];
        let sorteioLength = (sorteio.sequence.length + 1);

        for (let index = 1; index < sorteioLength; index++) {
            const numero = Number(sorteio['bola' + index]);
            if (!isNaN(numero))
                numeros.push(numero);
        }
        numeros.sort ((x,y) => {
            return x - y;
        })
        return numeros;
    }
}
