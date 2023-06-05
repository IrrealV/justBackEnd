import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source.js";
import { User } from "../../db/entity/user.js";

const usersRepo = AppDataSource.getRepository(User);

const getAllUsers = async (req: Request, res: Response) => {
  const users = await usersRepo.find();
  res.send(users);
};

export default getAllUsers;
