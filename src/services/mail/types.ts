export type bodyParams = object | string | number;

export interface IMail {
  type: string;
  to: string;
  subject: string;
  message: string;
  setMessage: (message: string) => void;
}

export abstract class Mail implements IMail {
  type: string;
  subject: string;
  message: string;

  to: string;

  constructor(to: string) {
    this.to = to;
  }

  setMessage(message: string): void {
    this.message = message;
  }
}

export interface IMailSender {
  sendEmail: (mail: IMail) => Promise<void>;
}
