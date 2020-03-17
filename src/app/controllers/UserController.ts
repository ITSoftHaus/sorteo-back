import App from '../App';
import User from '../models/User';
import UserDataProvider from '../providers/UserDataProvider';
import SecurityHelper from '../helpers/SecurityHelper';

export default class UserController {
    /**
     * UserDataProvider
     */
    private userProvider: UserDataProvider;

    constructor(private app: App) {
        this.userProvider = this.app.providers.user;
    }

    /**
     * Carregar todos os usuários
     * @param onLoad
     */
    findAll(onLoad: (err: string, data: User[]) => void) {
        this.userProvider.select({}, onLoad);
    }

    /**
     * Carregar usuário por email
     * @param email 
     * @param onLoad 
     * @param onError 
     */
    findByEmail(email: string, onLoad: (data: User | null) => void, onError: (msg: string, code: number) => void) {
        this.userProvider.findOne({ email: email }, (err, data) => {
            if (err) {
                onError(err.message, 500);
            } else {
                let result = data !== undefined ? data : null;
                onLoad(result);
            }
        });
    }

    /**
     * Criar novo usuário
     * @param data 
     * @param onCreate 
     * @param onError 
     */
    create(data: { email: string; password: string; name: any; }, onCreate: { (newData: any): void; (arg0: User): void; }, onError: (msg: string, code: number) => void) {

        let emailPattern = /^[a-z0-9_-]{4,}\@[-a-z0-9]{3,}\.[a-z]{2,3}$/;

        if (!emailPattern.test(data.email) || !data.password.length) {
            onError("E-mail ou senha inválidos", 400);
        } else {

            this.findByEmail(data.email, (result) => {
                if (!result) {
                    let user = new User();
                    user.name = data.name || data.email;
                    user.email = data.email;
                    user.password = SecurityHelper.generatePasswordHash(data.password);

                    this.userProvider.create(user, (err, newData) => {
                        if (err !== null) {
                            onError(err.message, 500);
                        } else {
                            onCreate(newData);
                        }
                    });
                } else {
                    onError("O usuário com o email especificado já existe", 400);
                }
            }, onError);
        }
    }

    /**
     * Excluir usuário por ID
     * @param id 
     * @param onRemove
     */
    removeById(id: string, onRemove: (err: any, numRemoved: number) => void) {
        this.userProvider.delete({ _id: id }, onRemove);
    }

    /**
     * Atualizando dados do usuário por ID
     * @param id 
     * @param newData
     * @param onUpdate
     */
    updateById({ id, newData, onUpdate }: { id: string; newData: User; onUpdate: (err: any, numReplaced: number) => void; }) {
        this.userProvider.update({ _id: id }, newData, onUpdate)
    }
}