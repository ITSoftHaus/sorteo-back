export default abstract class DataProcessor {

    abstract extractDataToModel (dataset: object[]) : object;

    abstract getModelS () : object[];   
}
