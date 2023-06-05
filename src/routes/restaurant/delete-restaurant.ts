import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source.js";
import { Restaurant } from "../../db/entity/restaurant.js";
import { Error } from "../../errors/error.response.js";

const restaurantRepo = AppDataSource.getRepository(Restaurant);

const deleteRestaurantById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { affected } = await restaurantRepo.delete({
    id: Number(id),
  });

  // When restaurant not found send error
  if (affected <= 0) {
    res.status(404).send(Error.response(403, "Not found", "Entity not found"));
    return;
  }

  res.send({
    status: "Deleted successfully",
  });
};

export default deleteRestaurantById;
