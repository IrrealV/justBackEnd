import { Request, Response } from "express";
import { User } from "../../db/entity/user.js";
import { AppDataSource } from "../../db/data-source.js";

const userRepo = AppDataSource.getRepository(User);

const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.query;

  const userToChangePass = await userRepo.findOneBy({
    token: String(token),
  });

  if (!userToChangePass) {
    res.send({
      error: "Invalid token",
    });
    return;
  }

  console.log(token);
  res.send({
    userToChangePass,
  });
};

export default resetPassword;
