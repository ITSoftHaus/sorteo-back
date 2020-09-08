import express from 'express';

import App from '../App';
import UserDataProvider from '../providers/UserDataProvider';
import SecurityHelper from '../helpers/SecurityHelper';

export default class AuthController {
  /**
   * UserDataProvider
   */
  private userProvider: UserDataProvider;

  constructor(private app: App) {
    this.userProvider = this.app.providers.user;
  }

  /**
   * Autenticação do usuário
   */
  login(req: express.Request, res: express.Response) {
    let email = req.body.email;
    let pswd = req.body.password;

    this.userProvider.findOne({ email: email }, (err, user) => {
      if (err) {
        res.sendStatus(500);
      } else {
        if (!user || !SecurityHelper.validatePassword(pswd, user.password)) {
          res.send({ msg: 'Неверный email или пароль', code: 400 });
        } else {
          user.lastVisit = Date.now().toString();
          this.userProvider.update(
            { _id: user._id },
            user,
            (_err, _numReplaced) => {
              console.log(`User ${user.email} lastVisit: ${user.lastVisit}`);
            }
          );

          req.session.userId = user._id;
          res.send({ msg: 'Welcome' });
        }
      }
    });
  }

  /**
   * Logout de sessão do usuário
   */
  logout(req: express.Request, res: express.Response) {
    let session = req.session;
    if (!session) {
      res.sendStatus(400);
    } else {
      session.destroy(_err => {
        res.send({ msg: 'Logout success' });
      });
    }
  }

  /**
   * Verificação de sessão do usuário
   */
  checkSession(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    let session = req.session;
    if (~['/login', '/add'].indexOf(req.path)) {
      if (!session.userId) {
        next();
      } else {
        // Not acceptable
        res.sendStatus(406);
      }
    } else {
      if (session.userId) {
        next();
      } else {
        // Unauthorized
        res.sendStatus(401);
      }
    }
  }
}
