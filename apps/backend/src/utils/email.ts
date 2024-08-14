import nodemailer, { Transporter } from 'nodemailer';
import { ErrorResponse } from './custom-error';
import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';
import env from '../../env';
let transporter: Transporter;

if (env.NODE_ENV === 'development') {
  transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: env.NODE_MAILER_EMAIL,
      pass: env.NODE_MAILER_PASSWORD,
    },
  });
} else {
  transporter = nodemailer.createTransport({
    // TODO: mailgun
  });
}

const readHtml = (fileName: string) => {
  const filePath = path.join(__dirname, '..', 'templates', fileName);
  try {
    return fs.readFileSync(filePath, {
      encoding: 'utf-8',
    });
  } catch (error) {
    console.log(error);
  }
};

type SendEmail = {
  to: string;
  subject: string;
  template: string;
  payload: {
    name: string;
    link: string;
  };
};

const sendEmail = async ({ to, subject, template, payload }: SendEmail) => {
  const html = readHtml(template);
  const templateCompiled = handlebars.compile(html);
  const htmlWithPayload = templateCompiled(payload);
  try {
    const info = await transporter.sendMail({
      sender: env.SENDER_EMAIL,
      to,
      subject,
      html: htmlWithPayload,
    });
  } catch (error) {
    console.log(error);
    return new ErrorResponse('Email not sent', 424); // https://stackoverflow.com/questions/54119994/http-status-code-when-sending-email-failed
  }
};

export { transporter, sendEmail };
