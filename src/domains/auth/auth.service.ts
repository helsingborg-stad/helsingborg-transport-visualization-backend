import { AuthDTO } from './types';
import { IAuthRepo } from './types';
import { UserRepository } from '@root/repositories';
import { toAuthDTO } from './auth.dto';
import StatusError from '@root/utils/statusError';
import { ForgotPasswordMail } from './mail/forgotPassword';
import { IMailSender, MailSender } from '@services/mail';
import { IUser } from '@root/entities';
import { buildForgotPasswordUrl } from '@utils/getForgotPasswordUrl';
export interface IAuthService {
  login(email: string, password: string): Promise<AuthDTO | null>;
  forgotPassword(email: string): Promise<void>;
  //   resetPassword(token: string, password: string): Promise<void>;
  //   getMe(id: number): Promise<AuthDTO>;
}

export class AuthService implements IAuthService {
  constructor(private authRepo: IAuthRepo = new UserRepository(), private mailSender: IMailSender = new MailSender()) {}
  async login(email: string, password: string): Promise<AuthDTO> {
    const user = await this.authRepo.findByEmail(email);

    if (!user) {
      throw new StatusError(401, 'Invalid login');
    }

    const isPasswordValid = await user.isPasswordValid(password);

    if (!isPasswordValid) {
      throw new StatusError(401, 'Invalid login');
    }
    return toAuthDTO(user);
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.authRepo.findByEmail(email);

    if (!user) {
      return;
    }

    user.setForgotPasswordToken();
    await this.authRepo.save(user);
    await this.sendForgotPasswordEmail(user);
  }

  async sendForgotPasswordEmail(user: IUser): Promise<void> {
    const email = new ForgotPasswordMail(user.email);
    const url = buildForgotPasswordUrl(user.forgotPasswordToken);
    email.setParams({ url });
    return this.mailSender.sendEmail(email);
  }
}
