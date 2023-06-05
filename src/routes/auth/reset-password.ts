import { Request, Response } from "express";
import { User } from "../../db/entity/user.js";
import { AppDataSource } from "../../db/data-source.js";
import bcrypt from "bcrypt";

const userRepo = AppDataSource.getRepository(User);

const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  console.log(token);
  const userToChangePass = await userRepo.findOneBy({
    token: String(token),
  });

  if (!userToChangePass) {
    res.send({
      error: "Invalid token",
    });
    return;
  }

  const encryptedPassword = await bcrypt.hash(newPassword, 10);
  userToChangePass.password = encryptedPassword;
  await userRepo.save(userToChangePass);

  console.log(token);
  res.send({
    userToChangePass,
  });
};

export default resetPassword;
