import { create, all } from 'mathjs'

const config = {};
const math = create(all, config);

export default abstract class MiningUtils {   
   
    static calculaPorcentagem ({valor, total}: {
        valor: number; total: number;
    }): number {
        
        const perc = 100;
        let porcentagem: string;

        {
            porcentagem = ((valor/total) * perc).toFixed(2);
        }

        return parseFloat(porcentagem);
    }
    
    static mediana(args: number[]): number {
        return math.median(args);
    }

    static media(args: number[]): number {
        return math.mean(args);
    }

    static moda(args: number[]): number {
        return math.mode(args);
    }

    static maximo(args: number[]): number {
        return math.max(args);
    }

    static minimo(args: number[]): number {
        return math.min(args);
    }

    static desvioPadrao(args: number[]): number {
        return math.std(args, 'biased');
    }

    static variancia(args: number[]): number {
        return math.variance(args);
    }
}
