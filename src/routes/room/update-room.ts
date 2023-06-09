import { io } from "../../index.js";
import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source.js";
import { Room } from "../../db/entity/room.js";
import { Error } from "../../errors/error.response.js";

const roomRepo = AppDataSource.getRepository(Room);

const updateRoomById = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Update room
  const { affected } = await roomRepo.update(
    {
      id: Number(id),
    },
    req.body
  );

  // When room not found send error
  if (affected <= 0) {
    res.status(404).send(Error.response(403, "No encontrado", "Entidad no encontrada"));
    return;
  }

  const room = await roomRepo.findOneBy({ id: Number(id) });

  // Send updated room as response
  io.emit("updateRoom", room);
  res.send({
    status: "exito",
    room: room,
  });
};

export default updateRoomById;
