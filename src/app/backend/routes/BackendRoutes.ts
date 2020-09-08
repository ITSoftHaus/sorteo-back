import { Request, Response } from 'express';

import App from '../../App';
import IApplicationRoute from '../../core/IApplicationRoute';
import AuthController from '../../controllers/AuthController';
import UserController from '../../controllers/UserController';
import SorteoController from '../../controllers/SorteoController';

const BackendRoutes: IApplicationRoute = {
  /**
   * Criando uma rota
   */
  createRouter(router) {
    let app = App.getInstance();

    let AuthCtrl = new AuthController(app);
    let UserCtrl = new UserController(app);
    let SorteoCtrl = new SorteoController(app);

    return (
      router()
        //.use(AuthCtrl.checkSession)
        .get('/', (_req: Request, res: Response) => {
          UserCtrl.findAll((_err: any, data: any) => {
            res.send({ users: data });
          });
        })
        .post('/add', (req: Request, res: Response) => {
          if (!req.body) {
            res.send({ msg: 'Empty body request', code: 400 });
          } else {
            UserCtrl.create(
              req.body,
              (newData: any) => {
                res.send({ userCreated: newData });
              },
              (msg, code) => {
                res.send({ message: msg, code: code });
              }
            );
          }
        })
        .post('/login', (req: Request, res: Response) => {
          if (!req.body) {
            res.send({ msg: 'Empty body request', code: 400 });
          } else {
            AuthCtrl.login(req, res);
          }
        })
        .get('/logout', AuthCtrl.logout)
        .get('/lotofacil/loadzipfile', async (_req: Request, res: Response) => {
          try {
            res.send({
              dataLoadedSorteiosLotofacil: SorteoCtrl.getZipFileFromUrl()
            });
          } catch (error) {
            console.error(error);
          }
        })
        .get('/lotofacil/loaded', (_req: Request, res: Response) => {
          res.send({
            dataLoadedSorteiosLotofacil: SorteoCtrl.getLoadedDataFromLotofacil()
          });
        })
        .get('/lotofacil/loaded/buffer', (_req: Request, res: Response) => {
          res.send({
            bufferSorteiosLotofacil: SorteoCtrl.getLoadedFileBufferFromLotofacil().toString()
          });
        })
        .get('/lotofacil/loaded/model', (_req: Request, res: Response) => {
          res.send({
            modelLoadedSorteiosLotofacil: SorteoCtrl.getLotofacilModels()
          });
        })
        .get(
          '/lotofacil/loaded/mining/totalizador/numerossorteadosbola/:bola',
          (_req: Request, res: Response) => {
            res.send({
              bolasSorteadas: SorteoCtrl.getLotofacilDataMining.getNumerosSorteadoPorBola(
                _req.params.bola
              )
            });
          }
        )
        .get(
          '/lotofacil/loaded/mining/totalizador/calcularnumerossorteadosbola/:bola',
          (_req: Request, res: Response) => {
            res.send({
              totalNumerosSorteadosPorBola: SorteoCtrl.getLotofacilDataMining.getCalcularNumerosSorteadosPorBola(
                _req.params.bola
              )
            });
          }
        )
        .get(
          '/lotofacil/loaded/mining/totalizador',
          (_req: Request, res: Response) => {
            res.send({
              totalizadorLotofacil: SorteoCtrl.getLotofacilDataMining.getTotalNumerosSorteadosTodosSorteios()
            });
          }
        )
        .get(
          '/lotofacil/loaded/mining/estatisticas/estatisticasconcursossorteados',
          (_req: Request, res: Response) => {
            res.send({
              estatisticasConcursosSorteados: SorteoCtrl.getLotofacilDataMining.getEstatisticasConcursosSorteados()
            });
          }
        )
        .get('/lotofacil/sorteios', SorteoCtrl.getLotofacilModel())
    );
  }
};

export default BackendRoutes;
