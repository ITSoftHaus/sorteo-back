import { Request, Response } from 'express';
import * as mongoose from 'mongoose';
import { LotofacilSchema } from '../models/schemas/LotofacilSchema';
import LotoFacil from '../models/LotoFacil';

const LotofacilModel = mongoose.model('LotofacilModel', LotofacilSchema);

export default class LotofacilController {
  public novo(Lotofacil: LotoFacil): any {
    let novo = new LotofacilModel(Lotofacil);
    novo.save((err, lotofacil) => {
      if (err) {
        return err;
      } else {
        return lotofacil;
      }
    });
  }

  public listarTodos(_req: Request, res: Response) {
    LotofacilModel.find({}, (err, lotofacil) => {
      if (err) {
        return res.send(err);
      }
      return res.jsonp(lotofacil);
    });
  }
}
