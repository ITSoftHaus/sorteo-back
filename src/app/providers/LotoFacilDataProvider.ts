import DataProvider from './DataProvider';
import Lotofacil from '../models/LotoFacil';

export default class UserDataProvider extends DataProvider {
    
    constructor() {
        super('Lotofacil');
    }

    /**
     * Seleciona os sorteios da lotofacil
     * @param where 
     * @param onSelect callback
     */
    select(where: any, onSelect: (err: any, sorteios: Lotofacil[]) => void) {
        this.store.find(where, onSelect);
    }

    /**
     * Cria um sorteio da lotofscil
     * @param data User
     * @param onCreate callback 
     */
    create(data: Lotofacil, onCreate: (err: any, newData: Lotofacil) => void) {
        this.store.insert(data, onCreate);
    }

    /**
     * Atualiza um sorteio da lotofscil
     * @param where update where
     * @param newData User
     * @param onUpdate callback 
     */
    update(where: any, newData: Lotofacil, onUpdate?: (err: any, numReplaced: number) => void) {
        this.store.update(where, {$set: newData}, {}, onUpdate);
    }

    /**
     * Deleta um sorteio da lotofscil
     * @param where 
     * @param onDelete callback
     */
    delete(where: any, onDelete?: (err: any, numRemoved: number) => void) {
        this.store.remove(where, {multi: true}, onDelete);
    }

    /**
     * Busca um sorteio da lotofscil
     * @param where 
     * @param onSelect callback
     */
    findOne(where: any, onSelect: (err: any, sorteio: Lotofacil) => void) {
        this.store.findOne(where, onSelect);
    }

    /**
     * @inheritdoc
     * @param err 
     */
    protected onLoadStore(err: any) {
        if (err !== null) {
            console.error(err);
        }
    }
}