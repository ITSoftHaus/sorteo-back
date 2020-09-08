import nedb from 'nedb';
import * as path from 'path';

export default abstract class DataProvider {
  /**
   * Store da applicação onde ficarão os datas da aplicação
   */
  static readonly ROOT_STORE = path.normalize(__dirname + '/../../../datas/');

  /**
   * Datastore
   */
  protected store: nedb;

  constructor(storeName = 'data') {
    this.store = new nedb({
      filename: DataProvider.ROOT_STORE + storeName + '.db'
    });

    this.store.loadDatabase(err => {
      this.onLoadStore(err);
    });
  }

  protected vacuumStore(): void {
    if (this.store instanceof nedb) {
      this.store.persistence.compactDatafile();
    }
  }

  protected abstract onLoadStore(err: any): void;
}
