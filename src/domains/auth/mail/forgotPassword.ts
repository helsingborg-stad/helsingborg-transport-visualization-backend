import { Mail } from '@services/mail';

export class ForgotPasswordMail extends Mail {
  subject = 'Återställ lösenord';
  type = 'html';
  setParams(url: string): void {
    this.message = `
    <p>Klicka på länken nedan för att återställa lösenordet</p>
    <a href="${url}">Återställ lösenord</a>
  `;
  }
}
