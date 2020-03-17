import crypto from 'crypto'; 

export default class SecurityHelper {

    /**
     * Gera um hash com base na cadeia de senha passada.
     * @param password 
     */
    static generatePasswordHash(password: string): string {
        let secret = 'TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX';
        return crypto.createHmac('sha1', secret).update(password).digest('hex');
    }

    /**
     * Senha de hash de validação
     * @param password 
     * @param hash 
     */
    static validatePassword(password: string, hash: string): boolean {
        return SecurityHelper.generatePasswordHash(password) === hash;
    }
}