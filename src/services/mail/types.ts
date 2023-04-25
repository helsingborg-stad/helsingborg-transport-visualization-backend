export enum MailTemplateId {
  forgotPassword = 'd-a8b51ae9b3a147ed9839483cf87a77a5',
}

export type bodyParams = object | string | number;

export interface IMail<T> {
  from: string;
  to: string;
  templateId: string;
  params: T;
  setParams: (params: T) => void;
  setTo: (email: string) => void;
}

export abstract class Mail<T> implements IMail<T> {
  from: string = 'dennis.hadzialic@vntrs.com';

  subject: string;

  to: string;

  templateId: string;

  constructor(to: string) {
    this.to = to;
  }

  abstract params: T;

  abstract setParams(params: T): void;

  setTo(email: string): void {
    this.to = email;
  }
}

export interface IMailSender {
  sendEmail: (mail: IMail<any>) => Promise<void>;
}
