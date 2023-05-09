import { AuthDTO } from './types';
import { IAuthRepo } from './types';
import { OrganisationRepository } from '@root/repositories';
import { toAuthDTO } from './auth.dto';
import StatusError from '@root/utils/statusError';
import { ForgotPasswordMail } from './mail/forgotPassword';
import { IMailSender, MailSender } from '@services/mail';
import { IOrganisation, Organisation } from '@root/entities';
import { buildForgotPasswordUrl } from '@utils/getForgotPasswordUrl';
import { SignupBody } from '@root/routes/auth/types';
export interface IAuthService {
  loginByPassword(identifier: string, password: string): Promise<AuthDTO | null>;
  loginByPinCode(orgNumber: string, pinCode: string): Promise<AuthDTO | null>;
  forgotPassword(identifier: string): Promise<void>;
  resetPassword(token: string, password: string): Promise<void>;
  signup(signupBody: SignupBody): Promise<AuthDTO>;
}

export class AuthService implements IAuthService {
  constructor(
    private authRepo: IAuthRepo = new OrganisationRepository(),
    private mailSender: IMailSender = new MailSender()
  ) {}
  async loginByPassword(identifier: string, password: string): Promise<AuthDTO> {
    const organisation = await this.authRepo.findByOrgNumberOrEmail(identifier);

    if (!organisation) {
      throw new StatusError(401, 'Invalid login');
    }

    const isPasswordValid = await organisation.isPasswordValid(password);

    if (!isPasswordValid) {
      throw new StatusError(401, 'Invalid login');
    }
    return toAuthDTO(organisation, true);
  }

  async loginByPinCode(orgNumber: string, pinCode: string): Promise<AuthDTO> {
    const organisation = await this.authRepo.findByOrgNumber(orgNumber);

    if (!organisation) {
      throw new StatusError(401, 'Invalid login');
    }

    const isPinCodeValid = await organisation.isPinCodeValid(pinCode);

    if (!isPinCodeValid) {
      throw new StatusError(401, 'Invalid login');
    }

    return toAuthDTO(organisation);
  }

  async resetPassword(token: string, password: string): Promise<void> {
    const organisation = await this.authRepo.findByForgotPasswordToken(token);

    if (!organisation) {
      throw new StatusError(400, 'Expired or invalid token.');
    }

    await organisation.setPassword(password);
    organisation.clearForgotPasswordToken();
    await this.authRepo.save(organisation);
  }

  async forgotPassword(identifier: string): Promise<void> {
    const organisation = await this.authRepo.findByOrgNumberOrEmail(identifier);

    if (!organisation) {
      return;
    }

    organisation.setForgotPasswordToken();
    await this.authRepo.save(organisation);
    await this.sendForgotPasswordEmail(organisation);
  }

  async sendForgotPasswordEmail(organisation: IOrganisation): Promise<void> {
    const email = new ForgotPasswordMail(organisation.email);
    const url = buildForgotPasswordUrl(organisation.forgotPasswordToken);
    email.setParams(url);
    return this.mailSender.sendEmail(email);
  }

  async signup(signupBody: SignupBody): Promise<AuthDTO> {
    const { orgNumber, name, email, password, pinCode } = signupBody;
    const organisation = await this.authRepo.findByOrgNumberOrEmail(orgNumber);

    if (organisation) {
      throw new StatusError(409, 'Organisation already exists');
    }

    const newOrganisation = new Organisation(orgNumber, email, name);
    newOrganisation.contactPerson = signupBody.contactPerson;
    newOrganisation.mobileNumber = signupBody.mobileNumber;
    await newOrganisation.setPassword(password);
    await newOrganisation.setPinCode(pinCode);

    return toAuthDTO(await this.authRepo.save(newOrganisation));
  }
}
