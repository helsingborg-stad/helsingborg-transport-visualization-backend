import logger from '@services/logger';
import { IMail } from './types';

export class MailSender {
  async sendEmail(mail: IMail): Promise<void> {
    logger.debug('Sending email', mail);
  }
}
