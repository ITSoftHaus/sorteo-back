import Totalizador from "../models/Totalizador";

export default abstract class ArrayUtils {
    
    static pushToArrayTotalizador({ arr, obj }: {
        arr: Totalizador[]; obj: Totalizador;
    }) {
        const index = arr.findIndex((e: { getNumero(): number; }) => e.getNumero() === obj.getNumero());

        if (index === -1) {
            arr.push(obj);
        } else {
            arr[index] = obj;
        }
    }
}