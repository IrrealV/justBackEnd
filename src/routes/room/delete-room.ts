import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source.js";
import { Room } from "../../db/entity/room.js";
import { Error } from "../../errors/error.response.js";

const roomRepo = AppDataSource.getRepository(Room);

const deleteRoomById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { affected } = await roomRepo.delete({
    id: Number(id),
  });

  if (affected <= 0) {
    res.status(404).send(Error.response(403, "No encontrado", "Entidad no encontrada"));
    return;
  }

  res.send({
    status: "Deleted successfully",
  })
};

export default deleteRoomById;
