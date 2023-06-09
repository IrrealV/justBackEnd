import { io } from "../../index.js";
import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source.js";
import { Restaurant } from "../../db/entity/restaurant.js";
import { Error } from "../../errors/error.response.js";

const restaurantRepo = AppDataSource.getRepository(Restaurant);

const updateRestaurantById = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Update restaurant
  const { affected } = await restaurantRepo.update(
    {
      id: Number(id),
    },
    req.body
  );

  // When restaurant not found send error
  if (affected <= 0) {
    res.status(404).send(Error.response(403, "No encontrado", "Entidad no encontrada"));
    return;
  }

  const restaurant = await restaurantRepo.findOneBy({ id: Number(id) });

  // Send updated restaurant as response
  io.emit("updateRestaurant", restaurant);
  res.send({
    status: "success",
    restaurant: restaurant,
  });
};

export default updateRestaurantById;
