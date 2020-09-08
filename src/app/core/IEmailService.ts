import { IMail } from './IMail';

export default interface IEmailService {
  sendMail(mail: IMail): Promise<IMail>;
}
