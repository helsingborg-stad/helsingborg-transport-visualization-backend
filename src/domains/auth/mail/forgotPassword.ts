import { Mail, MailTemplateId } from '@services/mail';

type ForgotPasswordMailProps = {
  url: string;
};

export class ForgotPasswordMail extends Mail<ForgotPasswordMailProps> {
  templateId: string = MailTemplateId.forgotPassword;

  params: ForgotPasswordMailProps;

  setParams(params: ForgotPasswordMailProps): void {
    this.params = params;
  }
}
