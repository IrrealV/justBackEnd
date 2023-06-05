import { io } from "../../index.js";
import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source.js";
import { Restaurant } from "../../db/entity/restaurant.js";

const restaurantRepo = AppDataSource.getRepository(Restaurant);

const createRestaurant = async (req: Request, res: Response) => {
  const restaurant = req.body;

  const restaurantToSave = await restaurantRepo.save(restaurant);

  io.emit("createRestaurant", restaurantToSave);
  
  res.send({
    status: "success",
    restaurant: restaurantToSave,
  });
};

export default createRestaurant;
