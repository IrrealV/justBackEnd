import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source.js";
import { Room } from "../../db/entity/room.js";

const roomRepo = AppDataSource.getRepository(Room);

const getRoomById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const Room = await roomRepo.findOneBy({
    id: Number(id),
  });

  res.send(Room);
};

export default getRoomById;
