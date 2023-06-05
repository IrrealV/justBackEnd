import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source.js";
import { Room } from "../../db/entity/room.js";
import { Restaurant } from "../../db/entity/restaurant.js";

const roomRepo = AppDataSource.getRepository(Room);
const restaurantRepo = AppDataSource.getRepository(Restaurant);

const getRoomByRestaurant = async (req: Request, res: Response) => {
  const { id } = req.params;

  const restaurantToFind = await restaurantRepo.findOneBy({ id: Number(id) });

  if (!restaurantToFind) {
    return res.status(404).send("Restaurant not found");
  }

  const roomFromRestaurant = await roomRepo.find({
    where: {
      restaurant: restaurantToFind,
    },
  });

  res.send(roomFromRestaurant);
};

export default getRoomByRestaurant;
