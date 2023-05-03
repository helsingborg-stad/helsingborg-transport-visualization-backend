import axios from 'axios';
import logger from '@services/logger';
import { config } from '@config';
import { IMail, IMailSender } from './types';

export class MailSender implements IMailSender {
  constructor() {
    if (config.env === 'test') {
      logger.debug('MailSender is disabled in test environment');
      return;
    }
  }

  async sendEmail(mail: IMail): Promise<void> {
    if (config.env === 'test') {
      logger.debug("MailSender won't send email in test environment");
      return;
    }

    const data = {
      data: {
        type: mail.type,
        attributes: {
          to: mail.to,
          subject: mail.subject,
          message: mail.message,
        },
      },
    };
    logger.debug('Sending email', data);

    await axios.post(config.mailApiUrl, data, {
      headers: {
        'X-API-Key': config.mailApiKey,
      },
    });
    logger.debug('Sending email', mail);
  }
}
