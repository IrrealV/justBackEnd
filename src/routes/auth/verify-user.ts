import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source.js";
import { User } from "../../db/entity/user.js";

const usersRepo = AppDataSource.getRepository(User);

export const verifyUser = async (req: Request, res: Response) => {
  const { token } = req.query;

  const userToVerify = await usersRepo.findOneBy({
    token: String(token),
  });

  userToVerify.isVerified = true;

  await usersRepo.save(userToVerify);


  res.send({
    "status":"exito"
  })
  res.redirect("http://justbackend-production.up.railway.app/api/v1/login");
};
