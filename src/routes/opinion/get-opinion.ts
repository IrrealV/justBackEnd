import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source.js";
import { Opinion } from "../../db/entity/opinion.js";

const opinionRepo = AppDataSource.getRepository(Opinion);

const getOpinionById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const opinion = await opinionRepo.findOneBy({
    id: Number(id),
  });

  res.send(opinion);
};

export default getOpinionById;
