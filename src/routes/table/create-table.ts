import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source.js";
import { Table } from "../../db/entity/table.js";
import { Restaurant } from "../../db/entity/restaurant.js";
import { Room } from "../../db/entity/room.js";

const tableRepo = AppDataSource.getRepository(Table);
const restaurantRepo = AppDataSource.getRepository(Restaurant);
const roomRepo = AppDataSource.getRepository(Room);

const createTable = async (req: Request, res: Response) => {
  const { state, room, restaurant } = req.body;

  //Buscar el restaurante y la sala por sus id
  const restaurantToFind = await restaurantRepo.findOneBy({
    id: Number(restaurant),
  });
  const roomToFind = await roomRepo.findOneBy({ id: Number(room) });

  if (!restaurantToFind) {
    return res.status(404).send("Restaurant not found");
  }
  if (!roomToFind) {
    return res.status(404).send("Room not found");
  }

  const createdTable = await tableRepo.save({
    state,
    room,
    restaurant,
  });

  res.send({
    success: "Table created successfully",
  });
};

export default createTable;
