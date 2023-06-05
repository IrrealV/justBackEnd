import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source.js";
import { Restaurant } from "../../db/entity/restaurant.js";

const restaurantRepo = AppDataSource.getRepository(Restaurant);

const getRestaurantById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const restaurant = await restaurantRepo.findOneBy({
    id: Number(id),
  });

  res.send(restaurant);
};

export default getRestaurantById;
