import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source.js";
import { User } from "../../db/entity/user.js";
import { io } from "../../index.js";
import bcrypt from "bcrypt";
import crypto from "node:crypto";
import jsonwebtoken from "jsonwebtoken";
import fs from "fs";
import handlebars from "handlebars";
import { sendMail } from "../../services/mail-service.js";

const usersRepo = AppDataSource.getRepository(User);
const htmlMailTemplate = fs.readFileSync(
  "../../services/mail-templates/create-user.html",
  "utf-8"
);

const createUser = async (req: Request, res: Response) => {
  const { username, email, phoneNumber, password, role, device } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  const template = handlebars.compile(htmlMailTemplate);

  const userToken = crypto.randomBytes(48).toString("hex");
  const createdUser = await usersRepo.save({
    username,
    email,
    phoneNumber,
    password: encryptedPassword,
    role,
    profileImage: req.body.profileImage, // Utiliza la ruta de la imagen guardada en req.body.profileImage
    device,
    token: userToken,
    isVerified: false,
  });

  const htmlMail = template(userToken);

  await sendMail({
    to: email,
    subject: "Confirm your new account",
    from: "RESTAURANT INFO <noreply@restaurantinfo.com>",
    html: htmlMail,
  });

  io.emit("updateNewUser", createdUser);

  const webToken = jsonwebtoken.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      data: "test",
    },
    process.env.JWT_SECRET
  );
  
  res.send({
    token: webToken,
  });
};

export default createUser;
