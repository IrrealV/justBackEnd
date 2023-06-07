import nodemailer from "nodemailer";
import { config } from "dotenv";

config();

export const createTransport = () => {
  const transport = nodemailer.createTransport(
    {
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      logger: true,
      debug: true,
      from: "ExpressBackend<expressbackend@test4.qastusoft.com.es>",
    },
    {
      from: "ExpressBackend<expressbackend@test4.qastusoft.com.es>",
    }
  );

  return transport;
};

export const sendMail = async (emailProperties: any) => {
  const transport = createTransport();

  const res = await transport.sendMail({
    to: emailProperties.to,
    subject: emailProperties.subject,
    html: emailProperties.html,
    from: emailProperties.from,
  });

  return res;
};
