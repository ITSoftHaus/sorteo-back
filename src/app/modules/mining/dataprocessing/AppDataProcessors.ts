import LotofacilDataProcessor from './LotofacilDataProcessor';

export default class AppDataProcessors {
  private processors: any[];

  constructor() {
    this.processors = this.getProcessors().map(processor => {
      return new processor();
    });
  }

  get lotofacilProcessor(): LotofacilDataProcessor {
    return this.getProcessorInstance(LotofacilDataProcessor);
  }

  private getProcessorInstance(typeProcessor: any): any | null {
    let items = this.processors.filter(processor => {
      if (processor instanceof typeProcessor) {
        return processor;
      }
    });
    return items.length > 0 ? items[0] : null;
  }

  private getProcessors(): any[] {
    return [LotofacilDataProcessor];
  }
}
