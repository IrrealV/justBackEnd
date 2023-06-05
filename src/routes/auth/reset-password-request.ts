import { config } from "dotenv";
import { AppDataSource } from "../../db/data-source.js";
import { User } from "../../db/entity/user.js";
import { Request, Response } from "express";
import crypto from "node:crypto";
import nodemailer from "nodemailer";

config();

const userRepo = AppDataSource.getRepository(User);

const resetPasswordRequest = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await userRepo.findOneBy({
    email: email,
  });

  user.token = crypto.randomBytes(48).toString("hex");

  await userRepo.save(user);

  const transport = nodemailer.createTransport(
    {
      host: "smtp-relay.sendinblue.com",
      port: 587,
      auth: {
        user: "restaurantbookingshelp@gmail.com",
        pass: "bZQfLgBTxN10p8E7",
      },
      logger: true,
      debug: true,
      from: "RESTAURANT INFO <noreply@restaurantinfo.com>",
    },
    {
      from: "RESTAURANT INFO  <noreply@restaurantinfo.com>",
    }
  );

  transport.sendMail({
    to: user.email,
    subject: "Reset password",
    html: `
        <div class="container" style="display: flex;align-items: center;justify-content: center;gap: 20px;flex-direction: column;">
            <div>Hello, ${user.username} click in the following button to reset your password,</div>
           
            <p>
                <a href="http://localhost:3000/api/v1/reset-password?token=${user.token}">
                    <button style="padding: 10px 20px;outline: none;border: none;border-radius: 2px;font-size: 15px;color: white;background: rgb(58, 58, 58);cursor: pointer;">
                    Reset password
                    </button>
                </a>
            </p>
         

            <p>
                Si el boton no funciona correctamente haga click en el siguiente enlace: 
                <br />
                http://localhost:3000/api/v1/reset-password?token=${user.token}
            </p>
            
        </div>
    `,
    from: "RESTAURANT INFO  <noreply@restaurantinfo.com>",
  });

  // Send email with token to reset password
  res.send({
    title: "Ok",
  });
};

export default resetPasswordRequest;
