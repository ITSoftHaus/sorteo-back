import DataLoader from './DataLoader';

export default class LotofacilDataLoader extends DataLoader{

    constructor() {      
        super(process.env.LOT_FAC_FILE);
    }

    public getDataLoaded(): any {
        if (super.getDataLoaded().length > 0) {
            let data = super.getDataLoaded()[0];
            Object.keys(data).filter((key) => {
                if (data[key].Bola1 === undefined) {
                    delete data[key];
                };
            });
            return data;
        }
    }
}
