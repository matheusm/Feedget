import nodemailer from 'nodemailer';

import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "9196e42135abc8",
    pass: "5110783c705a0f"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe feedget <oi@feedget.com>',
      to: 'Matheus Martins <matheusms280100@gmail.com>',
      subject,
      html: body
    })
  };

}