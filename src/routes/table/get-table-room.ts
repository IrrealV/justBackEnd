import { Request, Response } from "express";
import { Room } from "../../db/entity/room.js";
import { Table } from "../../db/entity/table.js";
import { AppDataSource } from "../../db/data-source.js";

const tableRepo = AppDataSource.getRepository(Table);
const roomRepo = AppDataSource.getRepository(Room);

const getTableByRoom = async (req: Request, res: Response) => {
  const { id } = req.params;

  const roomToFind = await roomRepo.findOneBy({ id: Number(id) });

  if (!roomToFind) {
    return res.status(404).send("Room not found");
  }

  const tableFromRoom = await tableRepo.find({
    where: {
      room: roomToFind,
    },
  });

  res.send(tableFromRoom);
};
export default getTableByRoom;
