export type bodyParams = object | string | number;

export interface IMail {
  from: string;
  to: string;
  subject: string;
  params: bodyParams;
  setParams: (params: bodyParams) => void;
  getBody: () => string;
  setTo: (email: string) => void;
}

export abstract class Mail implements IMail {
  from: string = 'test@email.com';

  subject: string;

  to: string;

  constructor(to: string) {
    this.to = to;
  }

  abstract params: bodyParams;

  abstract setParams(params: bodyParams): void;

  abstract getBody(): string;

  setTo(email: string): void {
    this.to = email;
  }
}
