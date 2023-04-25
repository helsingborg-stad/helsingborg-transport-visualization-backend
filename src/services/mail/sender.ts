import sendgridMail from '@sendgrid/mail';
import logger from '@services/logger';
import { config } from '@config';
import { IMail, IMailSender } from './types';

export class MailSender implements IMailSender {
  constructor() {
    if (config.env === 'test') {
      logger.debug('MailSender is disabled in test environment');
      return;
    }
    sendgridMail.setApiKey(config.sendgridKey);
  }

  async sendEmail(mail: IMail<any>): Promise<void> {
    if (config.env === 'test') {
      logger.debug("MailSender won't send email in test environment");
      return;
    }

    const data = {
      from: mail.from,
      to: mail.to,
      templateId: mail.templateId,
      dynamicTemplateData: mail.params,
    };
    logger.debug('Sending email', data);
    await sendgridMail.send(data);
    logger.debug('Sending email', mail);
  }
}
