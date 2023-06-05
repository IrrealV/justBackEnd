import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source.js";
import { Opinion } from "../../db/entity/opinion.js";
import { User } from "../../db/entity/user.js";

const opinionRepo = AppDataSource.getRepository(Opinion);
const userRepo = AppDataSource.getRepository(User);

const getOpinionByuser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const userToFind = await userRepo.findOneBy({ id: Number(id) });

  if (!userToFind) {
    return res.status(404).send("User not found");
  }

  const opinionFromUser = await opinionRepo.find({
    where: {
      user: userToFind,
    },
  });

  res.send(opinionFromUser);
};

export default getOpinionByuser;
