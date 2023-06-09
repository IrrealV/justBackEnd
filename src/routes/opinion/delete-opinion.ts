import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source.js";
import { Opinion } from "../../db/entity/opinion.js";
import { Error } from "../../errors/error.response.js";

const opinionRepo = AppDataSource.getRepository(Opinion);

const deleteOpinionById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { affected } = await opinionRepo.delete({
    id: Number(id),
  });

  if (affected <= 0) {
    res.status(404).send(Error.response(403, "No encontrado", "Entidad no encontrada"));
    return;
  }

  res.send({
    status: "Borrado con exíto",
  })
};

export default deleteOpinionById;
